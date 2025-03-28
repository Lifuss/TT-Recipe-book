import { Request, Response } from 'express';
import ctrlWrapper from '../../service/ctrlWrapper';
import { recipeInstance } from '../../service/recipesService';

const getRecipeByID = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data } = await recipeInstance.get(`/lookup.php?i=${id}`);

  res.status(200).json({ message: 'success', recipe: data });
});

export default getRecipeByID;
