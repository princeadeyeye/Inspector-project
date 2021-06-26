import express from 'express';
import { inspectorSignup, inspectorLogin, logout } from './auth.controllers'
import authMiddleware from '../../middlewares/auth.middleware';

const authRoute = express.Router();
export const autoPath = 'auth'.toLowerCase();

authRoute.post('/register', inspectorSignup);

authRoute.post('/login', inspectorLogin);

authRoute.post('/logout', authMiddleware, logout);

export default authRoute;
