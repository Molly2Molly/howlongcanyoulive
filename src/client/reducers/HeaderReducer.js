import { headerActionType } from "../actions/HeaderAction";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (
  state = {
    isShowBack: false,
    title: "How Long Can You Live"
  },
  action
) => {
  switch (action.type) {
    case headerActionType.REFRESHHEADER:
      return Object.assign({}, state, { isOpen: true });
    case headerActionType.SHOWBACK:
      return Object.assign({}, state, { isOpen: false });
    case headerActionType.HIDEBACK:
      return Object.assign({}, state, { isFetching: true });
    default:
      return state;
  }
};
