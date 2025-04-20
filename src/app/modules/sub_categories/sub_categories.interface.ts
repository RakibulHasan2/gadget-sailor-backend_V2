import { Model } from 'mongoose';

export type ISub_Categories = {
  category_name: string;
  sub_category_name: string;
};

export type sub_CategoriesModel = Model<ISub_Categories, Record<string, unknown>>;



