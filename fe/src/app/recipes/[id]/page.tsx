import RecipeInfoPage from "@/app/(components)/RecipeDetails";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const id = params.id;

  return <RecipeInfoPage id={id} />;
}
