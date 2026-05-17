import { createSupabaseServer } from "@/lib/supabase/server";
import type { Insight, InsightBody } from "@/lib/insights-data";

export interface InsightRow {
  id: string;
  slug: string;
  status: "draft" | "published" | "archived";
  date: string;
  author: string;
  cover_image: string;
  gradient: string;
  en: InsightBody;
  zh: InsightBody;
  created_at: string;
  updated_at: string;
}

export interface AdminInsight extends Insight {
  id: string;
  status: InsightRow["status"];
}

/** Pure mapper: DB row -> public Insight shape used by components. */
export function rowToInsight(r: InsightRow): AdminInsight {
  return {
    id: r.id,
    slug: r.slug,
    status: r.status,
    date: r.date,
    author: r.author,
    coverImage: r.cover_image,
    gradient: r.gradient,
    en: r.en,
    zh: r.zh,
  };
}

export async function getPublishedInsights(): Promise<Insight[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });
  if (error) throw new Error(`getPublishedInsights: ${error.message}`);
  return (data as InsightRow[]).map(rowToInsight);
}

export async function getPublishedInsight(
  slug: string,
): Promise<Insight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error(`getPublishedInsight: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}

/** Admin: all rows regardless of status (RLS still requires admin session). */
export async function getAllInsightsAdmin(): Promise<AdminInsight[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(`getAllInsightsAdmin: ${error.message}`);
  return (data as InsightRow[]).map(rowToInsight);
}

export async function getInsightByIdAdmin(
  id: string,
): Promise<AdminInsight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getInsightByIdAdmin: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}

export async function getInsightBySlugAdmin(
  slug: string,
): Promise<AdminInsight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getInsightBySlugAdmin: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}
