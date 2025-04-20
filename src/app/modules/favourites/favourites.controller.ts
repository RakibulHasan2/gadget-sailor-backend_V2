import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { favService } from "./favourites.service";
import { Request, Response } from "express";
import { IFav } from "./favourites.interface";

//create all Products
const AddToFav = catchAsync(async (req: Request, res: Response) => {
    const { ...favData } = req.body;
    const result = await favService.addToFav(favData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Added to favourite successfully',
        data: result,
    });
});

// retrieve all data from favourite
const GetFromFav = async (req: Request, res: Response) => {

    const result = await favService.getFromFav();

    sendResponse<IFav[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved from favourite successfully',
        data: result,
    });
};


// retrieve data from favourite by email
const GetFavByEmail = async (req: Request, res: Response) => {
    const Email = req.params.email;
    // console.log(Email)
    const result = await favService.getFavDataByEmail(Email);
    // console.log(result)
    sendResponse<IFav | IFav[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved from favourite by email successfully',
        data: result,
    });

};

// delete fav by id
const DeleteFav = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await favService.deleteFav(id);
    sendResponse<IFav>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Deleted from favourite successfully',
        data: result,
    });
});



export const favController = {
    AddToFav,
    GetFromFav,
    GetFavByEmail,
    DeleteFav
}