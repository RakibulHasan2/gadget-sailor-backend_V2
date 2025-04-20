import express from 'express';
import { ReviewsController } from './reviews.controller';

const router = express.Router();

router.post('/create-review',ReviewsController.createReviews);
router.get('/get-AllReviews', ReviewsController.getAllReviews);
router.get('/get-AllReviews/:p_id', ReviewsController.getByProductId);
router.delete('/get-AllReviews/:id', ReviewsController.DeleteReview)

export const reviewsRoute = router;
