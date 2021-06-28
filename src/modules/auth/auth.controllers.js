import uniqid  from 'uniqid';
import { registerInspector, loginInspector, logoutInspector, updateInspector } from "../../services/auth.service";
import { Response } from '../../utils/index';

export const inspectorSignup = async (req, res, next) => {
    try {
        let userData = req.body;
        const { inspector_name } = req.body;
        userData.unique_id = uniqid();
        userData.inspector_name = `${inspector_name}`.toUpperCase();
        if (!userData.email || !userData.password || !userData.inspector_name) return Response(res, { status: 400, message: 'Please enter an email, password and name' });
        let signUpUserData = await registerInspector(userData);
        if(!signUpUserData) return Response(res, { status: 409, message: `Your email ${userData.email} already exists` });
        return Response(res, { status: 200, data: {id: signUpUserData.unique_id, email: signUpUserData.email, name: signUpUserData.inspector_name}, message: 'successfully add inspector' });
      } catch (error) {
        next(error);
      }
}

export const inspectorLogin = async (req, res, next) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.password) 
    Response(res, { status: 400, message: 'Please enter email and password' });
    const successfulLogin = await loginInspector(userData);
    if(successfulLogin === 'INVALID_EMAIL') return Response(res, { status: 409, message: `Email ${userData.email} not found, Please register` });
    if(successfulLogin === 'WRONG_PASSWORD') return Response(res, { status: 409, message: `Wrong password, try again` });

    const { cookie, findUser } = successfulLogin

    res.setHeader('Set-Cookie', [cookie]);
    return res.status(200).json({ 
      message: 'login successfully',
      data: { id: findUser.unique_id, email: findUser.email, name: findUser.inspector_name }, 
      token: cookie
       });
  } catch (error) {
    next(error);
  }
}

export const logout = async (req, res) => {
    
  try {
    const userData = req.user;
    const logOutUserData = await logoutInspector(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ message: `${logOutUserData.inspector_name} has successfullly logout` });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userData = req.user;
    if(!userData) return Response(res, { status: 403, message: `An error has occured, please login` });
    return Response(res, { status: 200, data: {id: userData.unique_id, email: userData.email, name: userData.inspector_name}, message: 'successfully fetch user data' });
  } catch(error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    let userData = req.body;
    const { user } = req;
        const { inspector_name } = req.body;
        if(inspector_name) userData.inspector_name = `${inspector_name}`.toUpperCase();
        let signUpUserData = await updateInspector(user, userData);
        if(!signUpUserData) return Response(res, { status: 409, message: `${userData.email} has been used, update failed` });
        return Response(res, { status: 200, data: {id: signUpUserData.unique_id, email: signUpUserData.email, name: signUpUserData.inspector_name}, message: 'successfully updated' });
  }catch(error) {
    next(error)
  }
}