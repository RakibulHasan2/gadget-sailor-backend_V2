import { Schema, model } from 'mongoose';
import { IUsers, UserModel } from './user.interface';

const userSchema = new Schema<IUsers, UserModel>(
    {

        name: {
            required: true,
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                    type: String,
                    required: true,
                },
            },
        },
        email: {
            unique: true,
            required: true,
            type: String,
          
        },
        password: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        division: {
            type: String,
        },
        permanent_address: {
            type: String,
        },
        post_code: {
            type: String,
        },
        present_address: {
            type: String,
        },
        image: {
            type: String,
        },
        phoneNumber: {
            unique: true,
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
);
export const Users = model<IUsers, UserModel>('Users', userSchema);
