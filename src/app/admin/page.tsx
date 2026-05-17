import { getAllInsightsAdmin } from "@/lib/insights-source";
import ArticleListTable from "@/components/admin/ArticleListTable";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const items = await getAllInsightsAdmin();
  return <ArticleListTable items={items} />;
}
