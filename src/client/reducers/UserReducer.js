import { userActionType } from "../actions/UserAction";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (
  state = {
    isOpen: false,
    isFetching: false,
    email: "",
    password: "",
    nickname: "",
    birthday: "",
    sex: "male"
  },
  action
) => {
  switch (action.type) {
    case userActionType.OPENLOGINDIALOG:
      return Object.assign({}, state, { isOpen: true });
    case userActionType.CLOSELOGINDIALOG:
      return Object.assign({}, state, { isOpen: false });
    case userActionType.REGISTERUSER_START:
    case userActionType.LOGINUSER_START:
      return Object.assign({}, state, { isFetching: true });
    case userActionType.REGISTERUSER_ERROR:
    case userActionType.LOGINUSER_ERROR:
      return Object.assign({}, state, { isFetching: false });
    case userActionType.REGISTERUSER_SUCCESS:
      return Object.assign({}, state, action.userinfo, { isFetching: false });
    case userActionType.LOGINUSER_SUCCESS:
      return Object.assign({}, state, action.userinfo, { isFetching: false });
    default:
      return state;
  }
};
