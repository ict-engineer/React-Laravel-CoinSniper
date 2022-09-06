import { useDispatch, useSelector } from "react-redux";
import { GlobalService } from "../../services";
import { GLOBAL } from "../types";
import { useNotification } from "./notification.hook";

export const useGlobal = () => {
  const dispatch = useDispatch();
  const { isProgressing, showSubType, showType, allAdverts, mainAdvert, informationAdvert } = useSelector(({ global }) => global);
  const { showNotification } = useNotification();

  const changeProgressState = (payload) => {
    dispatch({
      type: GLOBAL.PROGRESS_CHANGE ,
      payload
    });
    return true;
  };

  const setShowSubType = (payload) => {
    dispatch({
      type: GLOBAL.SET_SHOW_SUBTYPE,
      payload
    });
    return true;
  }

  const setShowType = (payload) => {
    dispatch({
      type: GLOBAL.SET_SHOW_TYPE,
      payload
    });
    return true;
  }

  const getAllAdverts = async () => {
    try {
      changeProgressState(true);
      const result = await GlobalService.getAllAdverts();
      dispatch({ type: GLOBAL.SET_ALL_ADVERTS, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  }

  const getDisplayAdverts = async () => {
    try {
      changeProgressState(true);
      const result = await GlobalService.getDisplayAdverts();
      dispatch({ type: GLOBAL.SET_DISPLAY_ADVERTS, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  }

  const changeAdvertDisplay = async (payload) => {
    try {
      const result = await GlobalService.changeAdvertDisplay(payload);
      dispatch({ type: GLOBAL.CHANGE_ADVERT_DISPLAY, payload: result.data.data });
      showNotification("success", "Successfully changed");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const uploadAdvert = async (payload) => {
    try {
      const result = await GlobalService.uploadAdvert(payload);
      dispatch({ type: GLOBAL.SET_ALL_ADVERTS, payload: result.data.data });
      showNotification("success", "Successfully uploaded");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }
  return {
    isProgressing,
    showSubType,
    showType,
    allAdverts,
    mainAdvert,
    informationAdvert,
    changeProgressState,
    setShowSubType,
    setShowType,
    getAllAdverts,
    getDisplayAdverts,
    changeAdvertDisplay,
    uploadAdvert,
  };
};
