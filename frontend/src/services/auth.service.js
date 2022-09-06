// import delay from "../utils/delay";
import { apiUrls } from '../consts';
import { axiosService } from '.';

export const AuthService = (function () {
  const login = async (payload) => {
    return axiosService.post(apiUrls.LOGIN, payload);
  };

  const signup = async (payload) => {
    return axiosService.post(apiUrls.SIGNUP, payload);
  };

  const logout = async () => {
    return axiosService.post(apiUrls.LOGOUT);
  };

  const changePassword = async (payload) => {
    // return axiosService.post(apiUrls.CHANGE_PASSWORD, payload);
  };

  const resendVerifyLink = async () => {
    return axiosService.post(apiUrls.RESEND_VERIFY_LINK);
  }

  const getUserInfo = async () => {
    return axiosService.get(apiUrls.GET_USER_INFO);
  }

  const sendResetEmail = async (payload) => {
    return axiosService.post(apiUrls.SEND_RESET_EMAIL, payload);
  }

  const resetAuthPassword = async (payload) => {
    return axiosService.post(apiUrls.RESET_AUTH_PASSWORD, payload);
  }

  return {
    login,
    signup,
    changePassword,
    logout,
    resendVerifyLink,
    getUserInfo,
    sendResetEmail,
    resetAuthPassword,
  };
})();
