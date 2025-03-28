import { Request, Response } from 'express';
import ctrlWrapper from '../../service/ctrlWrapper';
import { recipeInstance } from '../../service/recipesService';

interface QueryType {
  s?: string; // by meal name
  i?: string; // by ingredient
  a?: string; // by area (country)
  c?: string; // by category
}

const getRecipes = ctrlWrapper(async (req: Request, res: Response) => {
  const { s, i, a, c } = req.query as QueryType;

  let endpoint = '';

  if (i) {
    endpoint = `/filter.php?i=${i}`;
  } else if (a) {
    endpoint = `/filter.php?a=${a}`;
  } else if (c) {
    endpoint = `/filter.php?c=${c}`;
  } else {
    const name = s || '';
    endpoint = `/search.php?s=${name}`;
  }

  const { data } = await recipeInstance.get(endpoint);

  if (data.meals === null || data.meals === undefined) {
    res.status(200).json({
      message: `meals with such filter not found `,
      recipes: [],
    });
  }
  res.status(200).json({ message: 'success', recipes: data.meals });
});

export default getRecipes;
