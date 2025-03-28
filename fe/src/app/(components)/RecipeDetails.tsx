"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strMeasure1?: string;
  strMeasure2?: string;
}

interface CategoryRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

type RecipeInfoPageProps = {
  id: string;
};

const RecipeInfoPage = ({ id }: RecipeInfoPageProps) => {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<CategoryRecipe[]>([]);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // actual recipe fetch
  useEffect(() => {
    if (!id) return;
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/recipes/${id}`);
        const data: { message: string; recipe: RecipeDetail[] } =
          await res.json();
        if (data.message === "success" && data.recipe.length > 0) {
          setRecipe(data.recipe[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipe();
  }, [id, apiUrl]);

  // for right sidebar fetch
  useEffect(() => {
    if (!recipe || !recipe.strCategory) return;
    const fetchCategoryRecipes = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/recipes?c=${recipe.strCategory}`
        );
        const data: { message: string; recipes: CategoryRecipe[] } =
          await res.json();
        if (data.message === "success") {
          setCategoryRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Error fetching category recipes:", error);
      }
    };
    fetchCategoryRecipes();
  }, [recipe, apiUrl]);

  const getIngredients = (r: RecipeDetail) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingKey = `strIngredient${i}` as keyof RecipeDetail;
      const measureKey = `strMeasure${i}` as keyof RecipeDetail;
      const ingredient = r[ingKey];
      const measure = r[measureKey];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (!recipe) {
    return <div className="p-4 mx-auto w-fit text-3xl">Loading...</div>;
  }

  const ingredients = getIngredients(recipe);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div className="md:w-3/4 bg-white shadow-md rounded-lg p-4 flex flex-col">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="md:w-1/3 mr-4 flex-shrink-0">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="md:w-2/3 text-center mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-2">{recipe.strMeal}</h1>
            <p
              className="text-blue-500 cursor-pointer underline"
              onClick={() => {
                router.push(`/recipes?a=${recipe.strArea}`);
              }}
            >
              {recipe.strArea}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {ingredients.map((item, idx) => (
              <li
                key={idx}
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  router.push(
                    `/recipes?i=${encodeURIComponent(item.ingredient)}`
                  );
                }}
              >
                {item.ingredient}
                {item.measure ? ` - ${item.measure}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:w-1/4 bg-white shadow-md rounded-lg p-4 h-fit">
        <h2 className="text-xl font-semibold mb-4">
          More in <span className="text-blue-500">{recipe.strCategory}</span>
        </h2>
        <ul className="space-y-2">
          {categoryRecipes.map((catRec) => (
            <li
              key={catRec.idMeal}
              className="cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                router.push(`/recipes/${catRec.idMeal}`);
              }}
            >
              <Image
                src={catRec.strMealThumb}
                alt={catRec.strMeal}
                width={50}
                height={50}
                className="rounded mr-2"
              />
              <span className="text-sm text-gray-700">{catRec.strMeal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeInfoPage;
