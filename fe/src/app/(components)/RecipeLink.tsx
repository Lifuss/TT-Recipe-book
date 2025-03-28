import Link from "next/link";
import React from "react";

const RecipeLink = ({ text = "Go to recipes" }: { text: string }) => {
  return (
    <Link
      className="bg-blue-300 p-3 text-lg rounded-lg block w-fit hover:text-white hover:bg-blue-500 transition-colors"
      href={"/recipes"}
    >
      {text}
    </Link>
  );
};

export default RecipeLink;
