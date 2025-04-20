import { Model } from "mongoose";

export type IFav = {
    I_id: string;
    product_name: string;
    model: string;
    price: number;
    image: string;
    email: string;
    count: number
};


export type IFavModel = Model<IFav, Record<string, unknown>>;