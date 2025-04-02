import { DirectionsView } from "@/views";

export async function generateStaticParams() {
  // Generate an array of numbers from 1 to 80
  return Array.from({ length: 80 }, (_, i) => ({
    recipeID: (i + 1).toString(),
  }));
}

export default async function DirectionsPage({
  params,
}: {
  params: Promise<{ recipeID: string }>;
}) {
  // Await the params promise
  const resolvedParams = await params;
  const recipeID = Math.min(Math.max(Number(resolvedParams.recipeID), 1), 80);

  return <DirectionsView recipeID={recipeID} />;
}
