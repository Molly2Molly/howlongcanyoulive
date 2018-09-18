import { userActionType } from "../actions/UserAction";
import { localStorageSession } from "../../../public/libs/utils";

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }

const initUser = localStorageSession.getItem("HLCYLUSER");

export default (
  state = {
    isOpen: false,
    isFetching: false,
    email: initUser ? initUser.email : "",
    password: initUser ? initUser.password : "",
    nickname: initUser ? initUser.nickname : "",
    birthday: initUser ? initUser.birthday : "",
    sex: initUser ? initUser.sex : ""
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
    case userActionType.LOGINUSER_SUCCESS:
      const newState = Object.assign({}, state, action.userinfo, {
        isFetching: false
      });
      localStorageSession.setItem("HLCYLUSER", newState, 1440);
      return newState;
    default:
      return state;
  }
};
