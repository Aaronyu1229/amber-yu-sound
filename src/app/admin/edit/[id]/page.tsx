import { notFound } from "next/navigation";
import { getInsightByIdAdmin } from "@/lib/insights-source";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const existing = await getInsightByIdAdmin(id);
  if (!existing) notFound();
  return <ArticleForm existing={existing} />;
}
