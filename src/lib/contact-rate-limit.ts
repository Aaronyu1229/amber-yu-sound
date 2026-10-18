// In-memory, per-instance limits for the public contact form (best effort, no external store).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const AUTO_REPLY_WINDOW_MS = 24 * 60 * 60 * 1000;

const requestsByIp = new Map<string, number[]>();
const autoReplyByEmail = new Map<string, number>();

// Vercel sets x-real-ip at the edge; the leftmost x-forwarded-for value is client-controlled.
export function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const hops = (request.headers.get("x-forwarded-for") ?? "").split(",").map((part) => part.trim()).filter(Boolean);
  return hops.at(-1) ?? "unknown";
}

export function isRateLimited(ip: string, now: number): boolean {
  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);
  return false;
}

export function reserveAutoReply(email: string, now: number): boolean {
  const lastAutoReply = autoReplyByEmail.get(email);
  if (lastAutoReply !== undefined && now - lastAutoReply < AUTO_REPLY_WINDOW_MS) {
    return false;
  }

  autoReplyByEmail.set(email, now);
  return true;
}

export function resetContactRateLimitsForTests(): void {
  requestsByIp.clear();
  autoReplyByEmail.clear();
}
