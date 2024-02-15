const initialState = {
  toastProperty: {
    isVisible: false,
    message: "",
    type: "",
  },
};

export function toast(state = initialState, action) {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        toastProperty: {
          isVisible: true,
          message: action?.payload?.message,
          type: action?.payload?.type,
        },
      };
    case "HIDE_TOAST":
      return {
        ...state,
        toastProperty: {
          isVisible: false,
          message: "",
          type: "",
        },
      };
    default:
      return state;
  }
}
