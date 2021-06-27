import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { getEnv } from "../utils";
import { Response } from '../utils/index';


const JWT_SECRET = getEnv('JWT_SECRET');

const authMiddleware = async (req, res, next) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      const secretKey = JWT_SECRET;
      const verificationResponse = (await jwt.verify(Authorization, secretKey));
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(Response(res, { status: 401, message: 'Wrong authentication token' }));
      }
    } else {
      next(Response(res, { status: 404, message: 'Authentication token missing' }));
    }
  } catch (error) {
    next(Response(res, { status: 401, message: 'Wrong authentication token' }));
  }
};

export default authMiddleware;
