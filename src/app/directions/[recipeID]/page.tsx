"use client";
import { DirectionsView } from "@/views";
import { useParams } from "next/navigation";

export default function DirectionsPage() {
  const params = useParams();
  const recipeID: number =
    Number(params.recipeID) > 80 || Number(params.recipeID) < 1
      ? 1
      : Number(params.recipeID);

  return <DirectionsView recipeID={recipeID} />;
}
