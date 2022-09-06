import { USER } from '../types';

const initialState = {
  user: {
    email: 'test@gmail.com',
    full_name: 'Dragan',
    email_verified_at: null,
  },
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER.SET_USER_DATA:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}
