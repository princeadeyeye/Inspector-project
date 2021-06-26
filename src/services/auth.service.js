import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model";
import { Response, getEnv } from "../utils";
import HttpException from '../exceptions/HttpException';


const JWT_SECRET = getEnv('JWT_SECRET');


export const registerInspector = async (res, userData) => {
    if (!userData.email || !userData.password) Response(res, { status: 400, message: 'Please enter an email and password' });

    const findUser = await userModel.findOne({ email: userData.email });
    if (findUser)
    Response(res, { status: 409, message: `Your email ${userData.email} already exists` });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData = await userModel.create({ ...userData, password: hashedPassword });

    return createUserData;

}

export const loginInspector = async (res, userData) => {

    if (!userData.email || !userData.password) 
    Response(res, { status: 400, message: 'Please enter email and password' });

    const findUser = await userModel.findOne({ email: userData.email });
    if (!findUser) 
    Response(res, { status: 409, message: `Email ${userData.email} not found, Please register` });

    const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching)
    Response(res, { status: 409, message: "Wrong password, try again" });

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
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
    if (!userData) throw new HttpException(400, "You're not userData");

    const findUser = await userModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }