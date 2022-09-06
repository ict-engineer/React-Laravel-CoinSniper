// import HttpClient from "./http-client";
// import delay from "../utils/delay";
import { apiUrls } from '../consts';
import { axiosService } from '.';

export const GlobalService = (function () {
  const getAllAdverts = async () => {
    return axiosService.get(apiUrls.GET_ALL_ADVERTS);
  }

  const getDisplayAdverts = async () => {
    return axiosService.get(apiUrls.GET_DISPLAY_ADVERTS);
  }

  const changeAdvertDisplay = async (payload) => {
    return axiosService.post(apiUrls.CHANGE_ADVERT_DISPLAY, payload);
  }

  const uploadAdvert = async (payload) => {
    return axiosService.post(apiUrls.UPLOAD_ADVERT, payload);
  }
  return {
    getAllAdverts,
    getDisplayAdverts,
    changeAdvertDisplay,
    uploadAdvert,
  };
})();
