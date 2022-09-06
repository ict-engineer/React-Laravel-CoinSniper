import { GLOBAL } from '../types';

const initialState = {
  isProgressing: false,
  showSubType: 'all_time',
  showType: 'top ranked',
  allAdverts: [],
  mainAdvert: "",
  informationAdvert: "",
};

export default function globalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GLOBAL.PROGRESS_CHANGE:
      return {
        ...state,
        isProgressing: payload,
      };
    case GLOBAL.SET_SHOW_SUBTYPE:
      return {
        ...state,
        showSubType: payload,
      };
    case GLOBAL.SET_SHOW_TYPE:
      return {
        ...state,
        showType: payload,
      };
    case GLOBAL.SET_ALL_ADVERTS:
      return {
        ...state,
        allAdverts: payload,
      };
    case GLOBAL.SET_DISPLAY_ADVERTS:
      return {
        ...state,
        mainAdvert: payload.mainAdvert,
        informationAdvert: payload.informationAdvert,
      };
    case GLOBAL.CHANGE_ADVERT_DISPLAY:
      let mainTmp = state.mainAdvert;
      let informationTmp = state.informationAdvert;
      let allTmp = state.allAdverts;

      if (payload.display === "Main Page")
        mainTmp = payload;
      if (payload.display === "Information Page")
        informationTmp = payload;
      allTmp.forEach((n, index) => {
        if (n.display === payload.display) {
          allTmp[index].display = "None";
        }
        if (n.id === payload.id) {
          allTmp[index] = { ...n, ...payload };
        }
      });
      return {
        ...state,
        mainAdvert: mainTmp,
        informationAdvert: informationTmp,
        allAdverts: allTmp,
      };
    default:
      return state;
  }
}
