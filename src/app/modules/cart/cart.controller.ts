import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { cartService } from "./cart.service";
import { Request, Response } from "express";
import { ICart } from "./cart.interface";


const addToCart = async (req: Request, res: Response) => {
    const { product_name, quantity, email } = req.body;
    const existingItem = await cartService.getCartDataByEmail(email, product_name) as ICart[];
    if (existingItem[0]?.product_name === product_name) {
        existingItem[0].quantity += quantity;
        existingItem[0].total_price += (existingItem[0].unit_price * quantity);
        const newData = {
            quantity: existingItem[0].quantity, 
            total_price: existingItem[0].total_price
        }
        const result = await cartService.updateCartItem(existingItem[0]._id.toString(), newData);
        sendResponse<ICart | ICart[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'cart data updated by email successfully',
            data: result,
        });
    } else {
        // If the product is not in the cart, create a new entry
        const result = await cartService.createCart(req.body);
        sendResponse<ICart | ICart[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'cart data created successfully',
            data: result,
        });
    }
};

//function to get Cart Data
const getCartData = async (req: Request, res: Response) => {

    const result = await cartService.getFromCart();

    sendResponse<ICart[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'cart data retrieved successfully',
        data: result,
    });
};


// Controller function to update single CArt by id
const updateSingleCart = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const newData = req.body;
    const result = await cartService.updateCartItem(id, newData);
    sendResponse<ICart>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'products updated successfully',
        data: result,
    });
}
);

// retrieve data from cart by email
const getCartByEmail = async (req: Request, res: Response) => {
    const Email = req.params.email;
    const result = await cartService.getCartDataByEmail(Email);
    sendResponse<ICart | ICart[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'cart data retrieved by email successfully',
        data: result,
    });

};

// delete Cart by id
const DeleteCart = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await cartService.DeleteCart(id);
    sendResponse<ICart>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart deleted successfully',
        data: result,
    });
});



export const cartController = {
    getCartData,
    getCartByEmail,
    DeleteCart,
    addToCart,
    updateSingleCart
}