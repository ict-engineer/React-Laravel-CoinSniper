import { COINS } from '../types';

const initialState = {
  promoteCoins: [],
  mainCoins: [],
  searchCoins: [],
  displayCoin: {},
  allCoins: [],
};

export default function coinsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case COINS.SET_ALL_COINS:
      return {
        ...state,
        allCoins: payload,
      };
    case COINS.ADD_COIN:
      {
        let allCoinsTmp = state.allCoins;
        allCoinsTmp.push(payload);

        return {
          ...state,
          allCoins: allCoinsTmp,
        };
      }
    case COINS.DELETE_COIN:
      {
        let allCoinsTmp = state.allCoins;
        allCoinsTmp.some((item, index) => {
          if (item.id === payload.id) {
            allCoinsTmp.splice(index, 1);
            return true;
          }
          return false;
        });

        return {
          ...state,
          allCoins: allCoinsTmp,
        };
      }
    case COINS.EDIT_COIN:
      {
        let allCoinsTmp = state.allCoins;
        allCoinsTmp.some((item, index) => {
          if (item.id === payload.id) {
            allCoinsTmp[index] = { ...item, ...payload };
            return true;
          }
          return false;
        });

        return {
          ...state,
          allCoins: allCoinsTmp,
        };
      }
    case COINS.SET_PROMOTE_COINS:
      return {
        ...state,
        promoteCoins: payload,
      };
    case COINS.SET_MAIN_COINS:
      return {
        ...state,
        mainCoins: payload,
      };
    case COINS.SET_FAVOURITE:
      {
        let displayCoinTmp = state.displayCoin;
        if (displayCoinTmp.id === payload.coin_id)
          displayCoinTmp.favourite = payload.favourite;

        let promoteCoinsTmp = state.promoteCoins;
        promoteCoinsTmp.forEach(n => {
          if (n.id === payload.coin_id) {
            n.favourite = payload.favourite;
          }
        });
        let mainCoinsTmp = state.mainCoins;
        mainCoinsTmp.forEach(n => {
          if (n.id === payload.coin_id) {
            n.favourite = payload.favourite;
          }
        });
        return {
          ...state,
          displayCoin: displayCoinTmp,
          promoteCoins: promoteCoinsTmp,
          mainCoins: mainCoinsTmp,
        }
      }
    case COINS.SET_UPVOTE:
      {
        let displayCoinTmp = state.displayCoin;
        if (displayCoinTmp.id === payload.coin_id) {
          displayCoinTmp = { ...displayCoinTmp, ...payload };
          displayCoinTmp.today_votes = displayCoinTmp.today_votes + 1;
        }

        let promoteCoinsTmp = state.promoteCoins;
        promoteCoinsTmp.forEach((n, index) => {
          if (n.id === payload.id) {
            promoteCoinsTmp[index] = { ...n, ...payload };
          }
        });
        let mainCoinsTmp = state.mainCoins;
        mainCoinsTmp.forEach((n, index) => {
          if (n.id === payload.id) {
            mainCoinsTmp[index] = { ...n, ...payload };
          }
        });
        return {
          ...state,
          promoteCoins: promoteCoinsTmp,
          mainCoins: mainCoinsTmp,
          displayCoin: displayCoinTmp,
        }
      }
    case COINS.SET_SEARCH_COINS:
      return {
        ...state,
        searchCoins: payload,
      }
    case COINS.SET_DISPLAY_COIN:
      return {
        ...state,
        displayCoin: payload,
      }
    default:
      return state;
  }
}
