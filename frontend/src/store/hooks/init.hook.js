import { LOCAL_STORAGE_KEY } from "../../consts";
import { USER, AUTH } from "../types";

const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

// Initializer
export const initUserFromStorage = async (dispatch) => {
  const saved = await localStorage.getItem(USER_DATA);
  const token = await localStorage.getItem(TOKEN);
  if (token === '' || token === null) {
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    dispatch({ type: USER.SET_USER_DATA, payload: parsed });
    dispatch({ type: AUTH.SET_TOKEN, payload: token });
  } catch { }
};
