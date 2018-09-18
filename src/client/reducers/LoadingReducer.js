import { loadingActionType } from "../actions/LoadingAction";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (
  state = {
    isOpen: false,
    title: ""
  },
  action
) => {
  switch (action.type) {
    case loadingActionType.OPENLOADING:
      return Object.assign({}, state, { isOpen: true, title: action.title });
    case loadingActionType.CLOSELOADING:
      return Object.assign({}, state, { isOpen: false });
    default:
      return state;
  }
};
