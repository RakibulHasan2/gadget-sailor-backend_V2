import { IUsers } from "./user.interface";
import { Users } from "./user.model";


// Function to create users
const createUsers = async (payload: IUsers): Promise<IUsers | null> => {
        const result = await Users.create(payload);
        return result;
};


// Function to retrieve all users
const getAllUsers = async (): Promise<IUsers[]> => {
        const users = await Users.find({});
        return users;
};


//get user by id
const getUserById = async (id: string): Promise<IUsers | null> => {
        const user = await Users.findById(id);
        return user;
};


//update user by Id
const UpdateUser = async (id: string, payload: Partial<IUsers>): Promise<IUsers | null> => {
        const result = await Users.findOneAndUpdate({ _id: id }, payload, { new: true });
        return result;
};


// delete user by id
const getDeleteUsers = async (id: string): Promise<IUsers | null> => {
        const result = await Users.findByIdAndDelete(id);
        return result;
};


export const UsersService = {
        createUsers,
        getAllUsers,
        getDeleteUsers,
        UpdateUser,
        getUserById
};