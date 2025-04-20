import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProductsService } from "./products.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IProducts } from "./products.interface";


//create all Products
const createProducts = catchAsync(async (req: Request, res: Response) => {
  const { ...ProductsData } = req.body;
  const result = await ProductsService.createProducts(ProductsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products is Created successfully',
    data: result,
  });
});


// retrieve all products
const getAllProducts = async (req: Request, res: Response) => {

  const result = await ProductsService.getAllProducts();

  sendResponse<IProducts[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products retrieved successfully',
    data: result,
  });
};

//retrieve single products by id or Category name
const getProductsByCategoryOrID = async (req: Request, res: Response) => {
  const categoryName = req.params.categoryName;

  const result = await ProductsService.getProductsByCategoryOrID(categoryName);

  sendResponse<IProducts | IProducts[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products retrieved successfully',
    data: result,
  });

};

// retrieve products by category and sub category
const getByCatAndSubCatOrSubCatAndBrand = async (req: Request, res: Response) => {
  const categoryName = req.params.categoryName;
  const subCategoryName = req.params.subCategoryName;
  const result = await ProductsService.getByCatAndSubCatOrSubCatAndBrand(categoryName, subCategoryName);

  sendResponse<IProducts[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products retrieved successfully',
    data: result,
  });
};


// Controller function to update single products by id
const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const newData = req.body;
  const result = await ProductsService.updateSingleProduct(id, newData);
  sendResponse<IProducts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products updated successfully',
    data: result,
  });
}
);

// delete Product by id
const DeleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductsService.DeleteProduct(id);
  sendResponse<IProducts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});


export const productsController = {
  createProducts,
  getAllProducts,

  updateSingleProduct,
  DeleteProduct,
  getProductsByCategoryOrID,
  getByCatAndSubCatOrSubCatAndBrand,
}