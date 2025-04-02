import DirectionsView from "@/views/DirectionsView";
import { allRecipes } from "@/data/recipeData";

export default async function DirectionsPage({
  params,
}: {
  params: { recipeID: string };
}) {
  // Ensure params is awaited
  const { recipeID } = await params;

  const parsedRecipeID = parseInt(recipeID, 10);

  return <DirectionsView recipeID={parsedRecipeID} />;
}

// This tells Next.js which routes to generate at build time
export function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    recipeID: recipe.id.toString(),
  }));
}
