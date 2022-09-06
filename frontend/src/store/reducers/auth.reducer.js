import { AUTH } from '../types';

const initialState = {
  token: "",
  authError: "",
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case AUTH.SET_AUTH_ERROR:
      return {
        ...state,
        authError: payload,
      }
    default:
      return state;
  }
}
