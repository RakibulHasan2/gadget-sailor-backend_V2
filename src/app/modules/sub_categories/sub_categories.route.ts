import express from 'express';
import { categoriesController } from './sub_categories.controller';



const router = express.Router();

//user signup 
router.post('/add_subCategory',categoriesController.create_subCategories);
router.get('/get-subCategories', categoriesController.getAllSubCategory);

export const subCategoriesRoute = router;
