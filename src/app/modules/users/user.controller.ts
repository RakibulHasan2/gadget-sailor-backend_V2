import { Request, Response } from 'express';
import catchAsync from './../../../shared/catchAsync';
import { UsersService } from './user.service';
import sendResponse from './../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUsers } from './user.interface';
import { Users } from './user.model';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';

// Controller function to create all users
const createUsers = catchAsync(async (req: Request, res: Response) => {
  const { ...usersData } = req.body;
  const result = await UsersService.createUsers(usersData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is Created successfully',
    data: result,
  });
});

//function to login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });
    if (user) {
      res.json(user)
    } else {
      res.status(401).json({ message: 'Invalid Email or Password' });
    }
});

// Controller function to get all users
const getAllUsers = async (req: Request, res: Response) => {
  const result = await UsersService.getAllUsers();
  sendResponse<IUsers[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
};

//get user by id
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UsersService.getUserById(id);
  sendResponse<IUsers>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});


//update user by id
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await UsersService.UpdateUser(id, updateData);
  sendResponse<IUsers>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});


// delete user by id
const deleteUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UsersService.getDeleteUsers(id);
  sendResponse<IUsers>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully',
    data: result,
  });
});

//--------------------------jwt token--------------------
const getJwtToken = async (req: Request, res: Response) => {
  const email = req.query.email
  const query = { email: email }
  const user = await Users.findOne(query)
  if (user) {
    const token = jwt.sign({ email }, config.access_token as Secret, { expiresIn: '1d' })
    return res.send({ accessToken: token })
  }
  res.status(403).send({ accessToken: '' })
}

export const usersController = {
  createUsers,
  getAllUsers,
  deleteUsers,
  updateUser,
  getUserById,
  getJwtToken,
  loginUser
};
 
