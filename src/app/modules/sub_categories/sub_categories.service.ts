import { ISub_Categories } from "./sub_categories.interface";
import { subCategories } from './sub_categories.model';



// Function to create categories
const create_SubCategories = async (payload: ISub_Categories): Promise<ISub_Categories | null> => {
    try {
        const result = await subCategories.create(payload);
        return result;
    } catch (error) {
        console.error('Error getting all sub category:', error);
        throw error;
    }
};


// Function to retrieve all users
const getAllSubCategory = async (): Promise<ISub_Categories[]> => {
    try {
        const categories = await subCategories.find({});
        return categories;
    } catch (error) {
        console.error('Error getting all sub category:', error);
        throw error;
    }
};


export const CategoriesService = {
    create_SubCategories,
    getAllSubCategory
};