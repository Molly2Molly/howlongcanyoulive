import {
  backStatusType,
  headerActionType,
  titleType
} from "../actions/HeaderAction";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (
  state = {
    backStatus: backStatusType.hide,
    title: titleType.default
  },
  action
) => {
  switch (action.type) {
    case headerActionType.REFRESHTITLE:
      return Object.assign({}, state, { title: action.title });
    case headerActionType.CHANGEBACKSTATUS:
      return Object.assign({}, state, { backStatus: action.backStatus });
    default:
      return state;
  }
};
