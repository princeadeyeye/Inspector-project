import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import userModel from '../models/user.model';
import { getEnv } from "../utils";

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
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
