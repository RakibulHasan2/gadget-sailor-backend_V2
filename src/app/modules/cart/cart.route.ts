import express from "express";
import { cartController } from "./cart.controller";

const router = express.Router();

router.get('/getCart', cartController.getCartData);
router.get('/getCart/:email', cartController.getCartByEmail)
router.post('/addCart', cartController.addToCart);
router.delete('/getCart/:id', cartController.DeleteCart)
router.put('/getCart/:id', cartController.updateSingleCart)

export const cartRoute = router;