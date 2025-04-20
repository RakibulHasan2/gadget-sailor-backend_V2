import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.get('/getPayment', paymentController.GetFromPaidData);
router.get('/getPayment/:email', paymentController.GetPaidDataByEmail);
router.put('/getPayment/:id', paymentController.updateSinglePaidData);
router.post('/addPayment', paymentController.AddToPaidData);
router.post('/payment/create-payment-intent', paymentController.handleCreatePaymentIntent);

export const paymentRoute = router;