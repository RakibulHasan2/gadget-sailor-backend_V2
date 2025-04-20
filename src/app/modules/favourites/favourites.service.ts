import { IFav } from "./favourites.interface";
import { fav } from "./favourites.model";

//function to add in favourites
const addToFav = async (payload: IFav): Promise<IFav | null> => {
    try {
        const result = await fav.create(payload);
        return result;
    }
    catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}

// Function to retrieve data from favourite list
const getFromFav = async (): Promise<IFav[]> => {
    const result = await fav.find({});
    return result;
};

// Function to retrieve data from favourite by email
const getFavDataByEmail = async (Email: string): Promise<IFav | IFav[] | null> => {
    if (Email.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await fav.findById(Email);
        return result;
    }
    else {
        const result = await fav.find({
            $or: [
                { email: Email },
                { product_name: Email }
            ]
        });
        return result;
    }

};

// delete fav by id
const deleteFav = async (id: string): Promise<IFav | null> => {
    const result = await fav.findByIdAndDelete(id);
    return result;
};

export const favService = {
    addToFav,
    getFromFav,
    getFavDataByEmail,
    deleteFav
}