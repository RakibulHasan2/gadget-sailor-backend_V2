
import { Schema, model } from "mongoose";
import { ICart, IcartModel } from "./cart.interface";

export const cartSchema = new Schema<ICart>(
    {
        product_name: {
            required: true,
            type: String
        },
        image: {
            type: String,
            required: true,
        },
        unit_price: {
            type: Number,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        u_id:{
            type: String,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

var thingCartSchema = new Schema({ cartSchema }, { strict: false });

export const cart = model<ICart, IcartModel>('Carts', thingCartSchema);