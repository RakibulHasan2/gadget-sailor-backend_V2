import { Schema, model } from "mongoose";
import { IFav, IFavModel } from "./favourites.interface";

export const favSchema = new Schema<IFav>(
    {
        I_id: {
            required: true,
            type: String
        },
        product_name: {
            required: true,
            type: String
        },
        model: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

var thingFavSchema = new Schema({ favSchema }, { strict: false });

export const fav = model<IFav, IFavModel>('Favourites', thingFavSchema);