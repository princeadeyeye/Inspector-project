import express from 'express';
import { inspectorSignup, inspectorLogin, logout, getProfile, updateProfile } from './auth.controllers'
import authMiddleware from '../../middlewares/auth.middleware';

const authRoute = express.Router();
export const autoPath = 'auth'.toLowerCase();

authRoute.post('/register', inspectorSignup);

authRoute.post('/login', inspectorLogin);

authRoute.post('/logout', authMiddleware, logout);

//get user data
authRoute.get('/profile', authMiddleware, getProfile);

//update user data
authRoute.put('/profile', authMiddleware, updateProfile);


export default authRoute;
