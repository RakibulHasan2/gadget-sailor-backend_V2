import { Schema, model } from "mongoose";
import { IPayment, IPaymentModel } from "./payment.interface";

export const paymentSchema = new Schema<IPayment>(
    {

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

var thingPaymentSchema = new Schema({ paymentSchema }, { strict: false });

export const payment = model<IPayment, IPaymentModel>('Payments', thingPaymentSchema);