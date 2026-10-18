import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST, resetContactRateLimitsForTests } from "./route";

const payload = {
  name: "Ada Lovelace",
  company: "Analytical Engines",
  email: "ada@example.com",
};

function contactRequest(ip: string, email = payload.email): Request {
  return new Request("https://dolcenforte.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ ...payload, email }),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetContactRateLimitsForTests();
    send.mockReset();
    send.mockResolvedValue({ data: { id: "message-id" }, error: null });
    process.env.RESEND_API_KEY = "test-key";
  });

  it("limits each IP to three requests per ten minutes", async () => {
    for (let index = 0; index < 3; index += 1) {
      expect((await POST(contactRequest("203.0.113.10", `ada${index}@example.com`))).status).toBe(200);
    }

    const response = await POST(contactRequest("203.0.113.10", "blocked@example.com"));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: "請稍後再試，10 分鐘內最多可送出 3 次聯絡表單。",
    });
    expect(send).toHaveBeenCalledTimes(6);
  });

  it("sends only one auto-reply to an email per day", async () => {
    expect((await POST(contactRequest("203.0.113.11"))).status).toBe(200);
    expect((await POST(contactRequest("203.0.113.12"))).status).toBe(200);

    expect(send).toHaveBeenCalledTimes(3);
    expect(send.mock.calls.filter(([message]) => message.to[0] === payload.email)).toHaveLength(1);
  });
});
