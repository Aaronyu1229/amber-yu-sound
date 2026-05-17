import InsightsPageContent from "@/components/InsightsPageContent";
import { getPublishedInsights } from "@/lib/insights-source";

export const revalidate = 60;

export default async function InsightsPage() {
  const insights = await getPublishedInsights();
  return <InsightsPageContent insights={insights} />;
}
