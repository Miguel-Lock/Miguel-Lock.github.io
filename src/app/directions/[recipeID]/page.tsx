import DirectionsView from "@/views/DirectionsView";
import { allRecipes } from "@/data/recipeData";

export default function DirectionsPage({
  params,
}: {
  params: { recipeID: string };
}) {
  return <DirectionsView recipeID={parseInt(params.recipeID)} />;
}

// This tells Next.js which routes to generate at build time
export function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    recipeID: recipe.id.toString(),
  }));
}
