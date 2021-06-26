import { registerInspector, loginInspector, logoutInspector } from "../../services/auth.service";
import { Response, getEnv } from '../../utils/index';

export const inspectorSignup = async (req, res, next) => {
    try {
        const userData = req.body;
        const signUpUserData = await registerInspector(res, userData);
        Response(res, { status: 200, data: signUpUserData, message: 'successfully add inspector' });
      } catch (error) {
        next(error);
      }
}

export const inspectorLogin = async (req, res, next) => {
  try {
    const userData = req.body;
    const { cookie, findUser } = await loginInspector(res, userData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findUser, message: 'login' });
  } catch (error) {
    next(error);
  }
}

export const logout = async (req, res) => {
    
  try {
    const userData = req.user;
    const logOutUserData = await logoutInspector(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: logOutUserData, message: 'logout' });
  } catch (error) {
    next(error);
  }
}