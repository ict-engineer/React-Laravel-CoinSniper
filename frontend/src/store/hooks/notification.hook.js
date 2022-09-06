import { useDispatch, useSelector } from "react-redux";

export const useNotification = () => {
  const dispatch = useDispatch();
  const { notiState, notiOptions } = useSelector(({ notification }) => notification);

  const showNotification = (variant, message) => {
    try {
      dispatch({ type: "SET_NOTIFICATION_VALUE", payload: { notiState: true, notiOptions: { message: message, variant: variant } } });
      return true;
    } catch ({ response, message }) {
      return false;
    }
  };

  const hideNotification = () => {
    try {
      dispatch({ type: "SET_NOTIFICATION_VALUE", payload: { notiState: false, notiOptions: {} } });
      return true;
    } catch ({ response, message }) {
      return false;
    }
  }

  return {
    notiState,
    notiOptions,
    showNotification,
    hideNotification
  };
};
