import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "../../services";
import { AUTH, USER } from "../types";
import { LOCAL_STORAGE_KEY } from "../../consts";
import { useGlobal } from "./global.hook";
import { useNotification } from "./notification.hook";

const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, authError } = useSelector(({ auth }) => auth);
  const { changeProgressState } = useGlobal();
  const { showNotification } = useNotification();

  const sendResetEmail = async (payload) => {
    try {
      changeProgressState(true);
      await AuthService.sendResetEmail(payload);
      changeProgressState(false);
      showNotification("success", "We have emailed your password reset link!");
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const resetAuthPassword = async (payload) => {
    try {
      changeProgressState(true);
      await AuthService.resetAuthPassword(payload);
      changeProgressState(false);
      showNotification("success", "Password changed successfully!");
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      showNotification("warning", 'Input corret email and password.');
      return false;
    }
  }

  const setAuthError = (payload) => {
    dispatch({ type: AUTH.SET_AUTH_ERROR, payload });
    return true;
  }

  const getUserInfo = async () => {
    try {
      changeProgressState(true);
      const result = await AuthService.getUserInfo();
      dispatch({ type: USER.SET_USER_DATA, payload: result.data.user });
      changeProgressState(false);
      await localStorage.setItem(USER_DATA, JSON.stringify(result.data.user));
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  }

  const resendVerifyLink = async () => {
    try {
      changeProgressState(true);
      await AuthService.resendVerifyLink();
      changeProgressState(false);
      showNotification("success", "Successfully resent verification link!");
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      showNotification("warning", "Failed to resend verify link!");
      return false;
    }
  }

  const login = async (payload) => {
    try {
      changeProgressState(true);
      const result = await AuthService.login(payload);
      dispatch({ type: AUTH.SET_TOKEN, payload: result.data.access_token });
      dispatch({ type: USER.SET_USER_DATA, payload: result.data.user });
      await localStorage.setItem(TOKEN, result.data.access_token);
      await localStorage.setItem(USER_DATA, JSON.stringify(result.data.user));
      changeProgressState(false);
      showNotification("success", "Logged in successfully!");
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      dispatch({ type: AUTH.SET_AUTH_ERROR, payload: 'These credentials do not match our records.' });
      return false;
    }
  }

  const signUp = async (payload) => {
    try {
      changeProgressState(true);
      const result = await AuthService.signup(payload);
      dispatch({ type: AUTH.SET_TOKEN, payload: result.data.access_token });
      dispatch({ type: USER.SET_USER_DATA, payload: result.data.user });
      await localStorage.setItem(TOKEN, result.data.access_token);
      await localStorage.setItem(USER_DATA, JSON.stringify(result.data.user));
      changeProgressState(false);
      showNotification("success", "Registered in successfully!");
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      if ('email' in response.data) {
        dispatch({ type: AUTH.SET_AUTH_ERROR, payload: response.data.email[0] });
      }
      else
        showNotification("warning", response.data.message);

      return false;
    }
  }

  const logOut = async () => {
    try {
      changeProgressState(true);
      await AuthService.logout();
      dispatch({ type: AUTH.SET_TOKEN, payload: "" });
      dispatch({ type: USER.SET_USER_DATA, payload: {} });
      await localStorage.setItem(TOKEN, "");
      await localStorage.setItem(USER_DATA, JSON.stringify({ full_name: '' }));
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      await localStorage.setItem(TOKEN, "");
      await localStorage.setItem(USER_DATA, JSON.stringify({ full_name: '' }));
      changeProgressState(false);
      return false;
    }
  }

  return {
    token,
    authError,
    login,
    signUp,
    logOut,
    setAuthError,
    resendVerifyLink,
    getUserInfo,
    sendResetEmail,
    resetAuthPassword,
  };
};
