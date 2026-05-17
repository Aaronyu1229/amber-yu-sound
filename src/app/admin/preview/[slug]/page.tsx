import { notFound } from "next/navigation";
import { getInsightBySlugAdmin } from "@/lib/insights-source";
import InsightDetail from "@/components/InsightDetail";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getInsightBySlugAdmin(slug);
  if (!item) notFound();
  return <InsightDetail item={item} prev={null} next={null} />;
}
