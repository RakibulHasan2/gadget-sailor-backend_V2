import { IPayment } from "./payment.interface";
import { payment } from "./payment.model";

const stripe = require("stripe")('sk_test_51M8NuoDiyv5tmMKuxijWM3IkO7XqsOGpmBJYahkL9xJcEzQvG8tyeJITzNDM0JC7YOQVhy23LfFiN5T6vxVHilJw00vh8IanKF');

//function to add in payment
const addToPaidList = async (payload: IPayment): Promise<IPayment | null> => {

    const min = 1000000;
    const max = 9999999;

    if (!payload.product_code) {

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        payload.payment_code = randomNumber
    }

    try {
        const result = await payment.create(payload);
        return result;
    }
    catch (error) {
        console.error('Error to do payment:', error);
        throw error;
    }
}


// Function to retrieve all data from payment list 
const getFromPaidList = async (): Promise<IPayment[]> => {
    const result = await payment.find({});
    return result;
};


// Function to retrieve data from payment by email
const getPaymentDataByEmail = async (Email: string): Promise<IPayment | IPayment[] | null> => {
    if (Email.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await payment.findById(Email);
        return result;
    }
    else {
        const result = await payment.find({
            email: Email
        });
        return result;
    }
};

//process payment in stripe
const processPayment = async (Price: number) => {
    try {
        const totalAmount = isNaN(Price) ? 0 : Price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: totalAmount,
            payment_method_types: ["card"],
        });
        return {
            clientSecret: paymentIntent.client_secret,
        };
    } catch (error) {
        throw new Error(`Error creating PaymentIntent: ${error}`);
    }
}


//update a single payment
const updateSinglePayment = async (id: string, payload: Partial<IPayment>): Promise<IPayment | null> => {
    const updatedPayment = await payment.findOneAndUpdate({ _id: id }, payload, { new: true });
    return updatedPayment;
};



export const paymentService = {
    addToPaidList,
    getFromPaidList,
    getPaymentDataByEmail,
    processPayment,
    updateSinglePayment
}