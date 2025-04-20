import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { paymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IPayment } from "./payment.interface";

//create payment data
const AddToPaidData = catchAsync(async (req: Request, res: Response) => {
    const { ...paymentData } = req.body;
    const result = await paymentService.addToPaidList(paymentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment done successfully',
        data: result,
    });
});



// retrieve all data from payment
const GetFromPaidData = async (req: Request, res: Response) => {

    const result = await paymentService.getFromPaidList();

    sendResponse<IPayment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved from payment successfully',
        data: result,
    });
};


// retrieve data from payment by email
const GetPaidDataByEmail = async (req: Request, res: Response) => {
    const Email = req.params.email;
    const result = await paymentService.getPaymentDataByEmail(Email);
    sendResponse<IPayment | IPayment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved from payment by email successfully',
        data: result,
    });

};

//process payment in stripe
const handleCreatePaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const price = data.totalPrice;

        if (isNaN(price)) {
            return res.status(400).json({ error: 'Invalid price' });
        }

        const paymentIntentResponse = await paymentService.processPayment(price);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Payment Intent successfully',
            data: paymentIntentResponse,
        });
    } catch (error) {
        next(error); // always good to forward errors to the error-handling middleware
    }
}


// Controller function to update single payment by id
const updateSinglePaidData = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const newData = req.body;
    const result = await paymentService.updateSinglePayment(id, newData);
    sendResponse<IPayment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'payment updated successfully',
        data: result,
    });
}
);

export const paymentController = {
    AddToPaidData,
    GetFromPaidData,
    GetPaidDataByEmail,
    handleCreatePaymentIntent,
    updateSinglePaidData
}