import { Model } from 'mongoose';


export type ICategory = {
  category_name: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;