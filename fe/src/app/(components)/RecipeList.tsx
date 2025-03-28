"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
};

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const searchParams = useSearchParams();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const s = searchParams.get("s");
        const i = searchParams.get("i");
        const a = searchParams.get("a");
        const c = searchParams.get("c");

        const params = new URLSearchParams();
        if (s) params.set("s", s);
        if (i) params.set("i", i);
        if (a) params.set("a", a);
        if (c) params.set("c", c);

        const response = await fetch(
          `${apiUrl}/api/recipes?${params.toString()}`
        );
        const data: { message: string; recipes: Recipe[] } =
          await response.json();

        if (data.message === "success") {
          setRecipes(data.recipes);
        } else {
          console.error("Error while fetching:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchRecipes();
  }, [searchParams, apiUrl]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map(
          ({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => (
            <div
              key={idMeal}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={strMealThumb}
                alt={strMeal}
                width={150}
                height={150}
                className="rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {strMeal}
              </h2>
              {strArea && strCategory && (
                <p className="text-sm text-gray-600 text-center">
                  <strong>Category:</strong> {strCategory} |{" "}
                  <strong>Area:</strong> {strArea}
                </p>
              )}
              <Link
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                href={`/recipes/${idMeal}`}
              >
                View Details
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RecipeList;
