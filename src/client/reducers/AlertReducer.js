import { alertActionType } from "../actions/AlertAction";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (
  state = {
    isOpen: false,
    title: "",
    callback: ""
  },
  action
) => {
  switch (action.type) {
    case alertActionType.OPENALERT:
      return Object.assign({}, state, {
        isOpen: true,
        title: action.title,
        callback: action.callback ? action.callback : ""
      });
    case alertActionType.CLOSEALERT:
      return Object.assign({}, state, { isOpen: false });
    default:
      return state;
  }
};
