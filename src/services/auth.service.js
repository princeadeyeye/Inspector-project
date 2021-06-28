import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";
import { Response, getEnv } from "../utils";
import HttpException from '../exceptions/HttpException';


const JWT_SECRET = getEnv('JWT_SECRET');


export const registerInspector = async (userData) => {
      const findUser = await userModel.findOne({ email: userData.email });
      if (findUser) return false;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const createUserData = await userModel.create({ ...userData, password: hashedPassword });
      createUserData.id = null;
      createUserData.hashedPassword = null
      return createUserData;
    
}

export const updateInspector = async (user, userData) => {
  let createUserData = {}
  const unique_id = user.unique_id;
  const findUser = await userModel.findOne({ email: userData.email });
  if (findUser && findUser.email !== user.email) return false;
  if(userData.password) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  createUserData = await userModel.findOneAndUpdate({ unique_id }, { ...userData, password: hashedPassword }, {new: true});
  }
  else createUserData = await userModel.findOneAndUpdate({ unique_id }, { ...userData }, {new: true});
  createUserData.id = null;
  createUserData.hashedPassword = null
  return createUserData;

}

export const loginInspector = async (userData) => {

    const findUser = await userModel.findOne({ email: userData.email });
    if (!findUser) return 'INVALID_EMAIL';

    const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) return 'WRONG_PASSWORD'

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, tokenData, findUser };
}

  function createToken(user) {
    const dataStoredInToken = { _id: user._id };
    const secret = JWT_SECRET;
    const expiresIn = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  function createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  export async function logoutInspector (userData) {
    if (!userData) return 'NOT_AVAILABLE';

    const findUser = await userModel.findOne({ email: userData.email, password: userData.password });
    // if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }