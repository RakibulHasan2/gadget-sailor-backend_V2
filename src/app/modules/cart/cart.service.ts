import { ICart } from "./cart.interface";
import { cart } from "./cart.model";

//function to create cart
const createCart = async (payload: ICart): Promise<ICart | null> => {
    try {
        const result = await cart.create(payload);
        return result;
    }
    catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}

// Function to retrieve data from cart
const getFromCart = async (): Promise<ICart[]> => {
    const result = await cart.find({});
    return result;
};

// Function to retrieve data from cart by email
const getCartDataByEmail = async (Email: string, productName?: string): Promise<ICart | ICart[] | null> => {
    const result = await cart.find({
        $or: [
            {
                $and: [
                    { email: Email },
                    { product_name: productName }
                ]
            },
            { u_id: Email },
        ]
    });
    return result;

};

export const updateCartItem = async (id: any, cartItemData: any) => {
    return await cart.findByIdAndUpdate(id, cartItemData, { new: true });
};

// delete Cart by id
const DeleteCart = async (id: string): Promise<ICart | null> => {
    const result = await cart.findByIdAndDelete(id);
    return result;
};



export const cartService = {
    createCart,
    getFromCart,
    getCartDataByEmail,
    DeleteCart,
    updateCartItem
}