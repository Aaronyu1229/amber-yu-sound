"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/allowlist";
import type { InsightBody } from "@/lib/insights-data";

export async function signOut() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export interface ArticleInput {
  id?: string;
  slug: string;
  date: string;
  author: string;
  coverImage: string;
  gradient: string;
  status: "draft" | "published";
  en: InsightBody;
  zh: InsightBody;
}

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email, process.env.ADMIN_EMAILS)) {
    throw new Error("Unauthorized");
  }
  return supabase;
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

function bodyComplete(b: InsightBody): boolean {
  return (
    Boolean(b.title?.trim()) &&
    Array.isArray(b.sections) &&
    b.sections.length > 0
  );
}

export async function saveArticle(input: ArticleInput) {
  const supabase = await requireAdmin();
  if (!isValidSlug(input.slug)) {
    return {
      ok: false as const,
      error:
        "A slug is required (lowercase letters, numbers, hyphens). Add an English title or set the slug manually.",
    };
  }

  if (
    input.status === "published" &&
    (!bodyComplete(input.en) || !bodyComplete(input.zh))
  ) {
    return {
      ok: false as const,
      error:
        "Both languages need a title and at least one block to publish.",
    };
  }

  const row = {
    slug: input.slug,
    date: input.date,
    author: input.author,
    cover_image: input.coverImage,
    gradient: input.gradient,
    status: input.status,
    en: input.en,
    zh: input.zh,
    updated_at: new Date().toISOString(),
  };

  const query = input.id
    ? supabase.from("insights").update(row).eq("id", input.id)
    : supabase.from("insights").insert(row);

  const { error } = await query;
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/insights");
  revalidatePath(`/insights/${input.slug}`);
  revalidatePath("/admin");
  return { ok: true as const };
}

export async function setStatus(
  id: string,
  slug: string,
  status: "draft" | "published" | "archived",
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("insights")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/admin");
  return { ok: true as const };
}

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadImage(formData: FormData) {
  const supabase = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false as const, error: "No file" };
  if (!ALLOWED.includes(file.type))
    return { ok: false as const, error: "Only JPG, PNG, or WebP allowed" };
  if (file.size > MAX_BYTES)
    return { ok: false as const, error: "Max 5MB" };

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("insights")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { ok: false as const, error: error.message };

  const { data } = supabase.storage.from("insights").getPublicUrl(path);
  return { ok: true as const, url: data.publicUrl };
}
