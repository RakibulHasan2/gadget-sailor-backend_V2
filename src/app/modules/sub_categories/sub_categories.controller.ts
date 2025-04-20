import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from 'express';
import { CategoriesService } from "./sub_categories.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ISub_Categories } from "./sub_categories.interface";

// Controller function to create sub categories
const create_subCategories = catchAsync(async (req: Request, res: Response) => {
    const { ...subCategoryData } = req.body;
    const result = await CategoriesService.create_SubCategories(subCategoryData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'category is Created successfully',
      data: result,
    });
  });


// Controller function to get all sub categories
const  getAllSubCategory = async (req: Request, res: Response) => { 
  const result = await CategoriesService.getAllSubCategory();
  sendResponse<ISub_Categories[]>(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Users retrieved successfully',
  data: result,
});
};


  export const categoriesController = {
    create_subCategories,
    getAllSubCategory
  };