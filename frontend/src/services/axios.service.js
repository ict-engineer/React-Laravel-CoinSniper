import axios from 'axios';
import { LOCAL_STORAGE_KEY } from "../consts";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const axiosService = (function () {
  // let AuthorizationToken = null;

  function addHeaders(userConfig) {
    const globalHeaders = {};

    if (localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)) {
      globalHeaders['Authorization'] = `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)}`;
    }

    const { headers } = userConfig;

    return {
      headers: {
        ...globalHeaders,
        ...headers,
      },
    };
  }

  // function setAuthorizationToken(token) {
  //   AuthorizationToken = token;
  // }

  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  function patch(endPoint, params = {}, userConfig = {}) {
    return axios.patch(endPoint, params, addHeaders(userConfig));
  }

  function put(endPoint, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  function del(endPoint, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    // setAuthorizationToken,
    get,
    post,
    put,
    patch,
    del,
  };
})();
