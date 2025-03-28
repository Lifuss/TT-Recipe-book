import Link from "next/link";
import RecipeLink from "./(components)/RecipeLink";

export default function Home() {
  return (
    <section>
      <div className="max-w-1/2 px-8 py-4 mx-auto mt-10 border-2 border-blue-200 flex-col justify-center items-center text-center">
        <h1 className="text-3xl">
          Welcome to <span className="text-blue-500">Recipe Book</span> site
        </h1>
        <p className="text-xl mt-4">
          <Link href={"/recipes"} className="underline">
            Here
          </Link>{" "}
          you can view list of many recipes and their preparation, ingredients,
          etc.
        </p>
        <span className="text-xl block mt-4">Enjoy your scrolling 🤗</span>
        <div className="flex justify-center mt-2">
          <RecipeLink />
        </div>
      </div>
    </section>
  );
}
