import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  lastName: string;
};

export type IUsers = {
  name: IUserName;
  email: string;
  password: string;
  phoneNumber: number;
  image: string;
  present_address: string;
  permanent_address: string;
  post_code: string;
  city: string;
  division: string;
};

export type UserModel = Model<IUsers, Record<string, unknown>>;



