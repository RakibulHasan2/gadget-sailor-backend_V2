import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoriesService } from "./categories.service";
import httpStatus from "http-status";
import { ICategory } from "./categories.interface";

const createCategories = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;
  const result = await CategoriesService.createCategories(categoryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category is Created successfully',
    data: result,
  });
});

const getAllCategories = async (req: Request, res: Response) => {

  // Call the getAllCategories function to retrieve all users
  const result = await CategoriesService.getAllCategories();

  // Send the categories as a JSON response
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category retrieved successfully',
    data: result,
  });
};

//controller for get category by id (updated by marzia)
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoriesService.getSingleCategory(id);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category retrieved successfully',
    data: result,
  });
});

export const categoriesController = {
  createCategories,
  getAllCategories,
  getSingleCategory
};