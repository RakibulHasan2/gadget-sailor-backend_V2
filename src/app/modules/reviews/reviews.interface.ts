import { Model } from 'mongoose';

export type IReviews = {
  customer_name: string;
  email: string;
  image: string;
  p_id: string;
  review: string;
  rating: number;
  product_name: string;
};

export type ReviewsModel = Model<IReviews, Record<string, unknown>>;