import { IReviews } from "./reviews.interface";
import { Reviews } from "./reviews.model";


// Function to create Reviews
const createReviews = async (payload: IReviews): Promise<IReviews | null> => {
    const result = await Reviews.create(payload);
    return result;
};

// Function to retrieve all Reviews
const getAllReviews = async (): Promise<IReviews[]> => {
    const reviews = await Reviews.find({});
    return reviews;
};

//retrieve review by product id
const getByProductId = async (p_id: string): Promise<IReviews[] | null> => {
    const result = await Reviews.find({
        p_id: p_id
    });
    return result;
};

// delete review by id
const DeleteReview = async (id: string): Promise<IReviews | null> => {
    const result = await Reviews.findByIdAndDelete(id);
    return result;
};


export const ReviewsService = {
    createReviews,
    getAllReviews,
    getByProductId,
    DeleteReview
};