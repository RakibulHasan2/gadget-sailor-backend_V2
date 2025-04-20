import mongoose, { Schema, model } from 'mongoose';
import { IProducts, ProductsModel } from './products.interface';

export const productsSchema = new Schema<IProducts>(
    {
        category_name: {
            required: true,
            type: String
        },
        sub_category_name: {
            type: String,
        },
        brand_name: {
            type: String,
            required: true,
        },
        product_name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: [String],
            required: true,
            unique: true,
        },
        model: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        product_code: {
            type: Number,
            required: true,
            unique: true,
        },
        quantity: {
            type: Number,
        },
        status: {
            type: String,
            required: true,
        },
        reviews: {
            type: [],
            required: true,
        },
        warranty: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        others_info: {
            type: Object
        },
        I_id: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

var thingSchema = new Schema({ productsSchema }, { strict: false });

export const Products = model<IProducts, ProductsModel>('Products', thingSchema);
