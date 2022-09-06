const initialState = {
  notiState: null,
  notiOptions: {
    message: 'Hi',
    variant: null
  }
};

export default function NOTIFICATIONReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_NOTIFICATION_VALUE":
      return {
        ...state,
        notiState: payload.notiState,
        notiOptions: payload.notiOptions,
      };
    default:
      return state;
  }
}
