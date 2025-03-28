import { Router } from 'express';
import getRecipes from '../controllers/recipes/getRecipes';
import getRecipeByID from '../controllers/recipes/getRecipeById';

const router = Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeByID);

export default router;
