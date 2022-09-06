import { useDispatch, useSelector } from "react-redux";
import { CoinsService } from "../../services";
import { COINS } from "../types";
import { useNotification } from "./notification.hook";
import { useGlobal } from "./global.hook";

export const useCoins = () => {
  const dispatch = useDispatch();
  const { promoteCoins, mainCoins, searchCoins, displayCoin, allCoins } = useSelector(({ coins }) => coins);
  const { changeProgressState } = useGlobal();
  const { showNotification } = useNotification();

  const getPromoteCoins = async () => {
    try {
      changeProgressState(true);
      const result = await CoinsService.getPromoteCoins();
      dispatch({ type: COINS.SET_PROMOTE_COINS, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  };

  const getAllCoins = async () => {
    try {
      changeProgressState(true);
      const result = await CoinsService.getAllCoins();
      dispatch({ type: COINS.SET_ALL_COINS, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  };

  const editCoin = async (payload) => {
    try {
      const result = await CoinsService.editCoin(payload);
      dispatch({ type: COINS.EDIT_COIN, payload: result.data.data });
      showNotification("success", "Successfully edited");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  };

  const deleteCoin = async (payload) => {
    try {
      await CoinsService.deleteCoin(payload);
      dispatch({ type: COINS.DELETE_COIN, payload });
      showNotification("success", "Successfully deleted");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  };

  const getMainCoins = async (payload) => {
    try {
      changeProgressState(true);
      const result = await CoinsService.getMainCoins(payload);
      dispatch({ type: COINS.SET_MAIN_COINS, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  };

  const uploadCoin = async (payload) => {
    try {
      await CoinsService.uploadCoin(payload);
      showNotification("success", "Successfully uploaded");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const setFavourite = async (payload, showType) => {
    try {
      const result = await CoinsService.setFavourite(payload);
      dispatch({ type: COINS.SET_FAVOURITE, payload: { coin_id: result.data.coin_id, favourite: result.data.state } });
      if (result.data.state === true)
        showNotification("success", "Successfully set as favourited!");
      else
        showNotification("success", "Successfully set as unfavourited!");
      if (showType === "favourites") {
        const result = await CoinsService.getMainCoins({ type: showType });
        dispatch({ type: COINS.SET_MAIN_COINS, payload: result.data.data });
      }
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const setUpvote = async (payload, showType, showSubType) => {
    try {
      const result = await CoinsService.setUpvote(payload);
      if (result.data.success) {
        dispatch({ type: COINS.SET_UPVOTE, payload: result.data.data });
        showNotification("success", "You voted successfully!");
      }
      else {
        showNotification("warning", result.data.message);
      }
      if (showType === "top ranked" || showType === "hot" || showType === 'new') {
        const result = await CoinsService.getMainCoins({ type: showType, subType: showSubType });
        dispatch({ type: COINS.SET_MAIN_COINS, payload: result.data.data });
      }
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const setShare = async () => {
    try {
      await CoinsService.setShare();
      showNotification("success", "Coin information link is saved on clipboard!");
      return true;
    } catch ({ response, message }) {
      return false;
    }
  }

  const getSearchCoins = async (payload) => {
    try {
      const result = await CoinsService.getSearchCoins(payload);
      dispatch({ type: COINS.SET_SEARCH_COINS, payload: result.data.data });
      return true;
    } catch ({ response, message }) {
      return false;
    }
  }

  const getDisplayCoin = async (payload) => {
    try {
      changeProgressState(true);
      const result = await CoinsService.getDisplayCoin(payload);
      dispatch({ type: COINS.SET_DISPLAY_COIN, payload: result.data.data });
      changeProgressState(false);
      return true;
    } catch ({ response, message }) {
      changeProgressState(false);
      return false;
    }
  }

  const getFromCoingecko = async (payload) => {
    try {
      const result = await CoinsService.getFromCoingecko(payload);
      dispatch({ type: COINS.ADD_COIN, payload: result.data.data });
      showNotification("success", result.data.data.name + " Coin Added!");
      return true;
    } catch ({ response, message }) {
      showNotification("warning", response.data.message);
      return false;
    }
  }

  const getBinanceCoinIds = async () => {
    try {
      const result = await CoinsService.getBinanceCoinIds();
      return result.data.data;
    } catch ({ response, message }) {
      return [];
    }
  }

  return {
    promoteCoins,
    mainCoins,
    searchCoins,
    displayCoin,
    allCoins,
    getFromCoingecko,
    getAllCoins,
    editCoin,
    deleteCoin,
    getPromoteCoins,
    uploadCoin,
    setFavourite,
    setUpvote,
    setShare,
    getMainCoins,
    getSearchCoins,
    getDisplayCoin,
    getBinanceCoinIds,
  };
};
