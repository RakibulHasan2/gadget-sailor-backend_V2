import { ICategory } from "./categories.interface";
import { Categories } from "./categories.model";


// Function to create categories
const createCategories = async (payload: ICategory): Promise<ICategory | null> => {
    const result = await Categories.create(payload);
    return result;
};

// Function to retrieve all categories
const getAllCategories = async (): Promise<ICategory[]> => {
        const categories = await Categories.find({});
        return categories;
};

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
    const result = await Categories.findById(id);
    return result;
  };

export const CategoriesService = {
    createCategories,
    getAllCategories,
    getSingleCategory
};