import express from 'express';
import { usersController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './usersValidation';

const router = express.Router();

//user signup 
router.post('/auth/signup',validateRequest(UserValidation.createUserZodSchema),usersController.createUsers);
router.post('/auth/login',usersController.loginUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUsers);
// router.get('/jwt', usersController.getJwtToken)

export const UserRoute = router;
