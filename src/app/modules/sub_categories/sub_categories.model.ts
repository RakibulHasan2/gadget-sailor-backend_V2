import { Schema, model } from 'mongoose';
import { ISub_Categories, sub_CategoriesModel } from './sub_categories.interface';



const sub_CategoriesSchema = new Schema<ISub_Categories>(
    {
        category_name:{
            type: String,
            required: true,
        },
        sub_category_name: {
            unique: true,
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);
export const subCategories= model<ISub_Categories, sub_CategoriesModel>('sub-category', sub_CategoriesSchema);
