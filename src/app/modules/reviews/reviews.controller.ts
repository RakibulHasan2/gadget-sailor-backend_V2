import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewsService } from "./reviews.service";
import httpStatus from "http-status";
import { IReviews } from "./reviews.interface";

const createReviews = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;
  const result = await ReviewsService.createReviews(reviewData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews is Created successfully',
    data: result,
  });
});

const getAllReviews = async (req: Request, res: Response) => {
  const result = await ReviewsService.getAllReviews();
  sendResponse<IReviews[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
};

//retrieve review by product id
const getByProductId = async (req: Request, res: Response) => {
  const p_id = req.params.p_id;
  const result = await ReviewsService.getByProductId(p_id);
  sendResponse<IReviews[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reviews retrieved successfully',
    data: result,
  });
};

// delete Review by id
const DeleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewsService.DeleteReview(id);
  sendResponse<IReviews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewsController = {
  createReviews,
  getAllReviews,
  getByProductId,
  DeleteReview
};