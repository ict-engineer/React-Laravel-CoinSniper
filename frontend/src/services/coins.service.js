import { apiUrls } from '../consts';
import { axiosService } from '.';
import delay from 'utils/delay';

export const CoinsService = (function () {
  const getPromoteCoins = async () => {
    return axiosService.get(apiUrls.GET_PROMOTE_COINS);
  }

  const getMainCoins = async (payload) => {
    return axiosService.post(apiUrls.GET_MAIN_COINS, payload);
  }

  const uploadCoin = async (payload) => {
    return axiosService.post(apiUrls.UPLOAD_COIN, payload);
  }

  const setFavourite = async (payload) => {
    return axiosService.post(apiUrls.SET_FAVOURITE, payload);
  }

  const setUpvote = async (payload) => {
    return axiosService.post(apiUrls.SET_UPVOTE, payload);
  }

  const setShare = async () => {
    await delay(10);
    return true;
  }

  const getSearchCoins = async (payload) => {
    return axiosService.post(apiUrls.SET_SEARCH_COINS, payload);
  }

  const getDisplayCoin = async (payload) => {
    return axiosService.post(apiUrls.GET_DISPLAY_COIN, payload);
  }

  const getAllCoins = async () => {
    return axiosService.get(apiUrls.GET_ALL_COINS);
  }

  const editCoin = async (payload) => {
    return axiosService.post(apiUrls.EDIT_COIN, payload);
  }

  const deleteCoin = async (payload) => {
    return axiosService.post(apiUrls.DELETE_COIN, payload);
  }

  const getFromCoingecko = async (payload) => {
    return axiosService.post(apiUrls.GET_COINS_FROM_API, payload);
  }

  const getBinanceCoinIds = async () => {
    return axiosService.get(apiUrls.GET_BINANCE_IDS);
  }
  return {
    getPromoteCoins,
    uploadCoin,
    setFavourite,
    setUpvote,
    setShare,
    getMainCoins,
    getSearchCoins,
    getDisplayCoin,
    getAllCoins,
    editCoin,
    deleteCoin,
    getFromCoingecko,
    getBinanceCoinIds,
  };
})();
