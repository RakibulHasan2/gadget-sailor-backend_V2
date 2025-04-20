import { Model } from "mongoose";

export type IPayment = {
    [key: string]: string | number | boolean | any | any[] | IPayment;
};

export type IPaymentModel = Model<IPayment, Record<string, unknown>>;