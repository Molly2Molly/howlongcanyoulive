import fetch from "cross-fetch";
import axios from "axios";
import config from "../../../config";
import { openLoading, closeLoading } from "./LoadingAction";
import { openAlert } from "./AlertAction";
import { headerIndex } from "./HeaderAction";

export const userActionType = {
  OPENLOGINDIALOG: "OPENLOGINDIALOG",
  CLOSELOGINDIALOG: "CLOSELOGINDIALOG",
  GOTOREGISTERPAGE: "GOTOREGISTERPAGE",
  REGISTERUSER_START: "REGISTERUSER_START",
  REGISTERUSER_SUCCESS: "REGISTERUSER_SUCCESS",
  REGISTERUSER_ERROR: "REGISTERUSER_ERROR",
  LOGINUSER_START: "LOGINUSER_START",
  LOGINUSER_SUCCESS: "LOGINUSER_SUCCESS",
  LOGINUSER_ERROR: "LOGINUSER_ERROR"
};

export function openLoginDialog() {
  return { type: userActionType.OPENLOGINDIALOG };
}
export function closeLoginDialog() {
  return { type: userActionType.CLOSELOGINDIALOG };
}
export function gotoRegisterPage() {
  return { type: userActionType.GOTOREGISTERPAGE };
}

// thunk action creator
export function registerUser(
  history,
  email,
  password,
  nickname,
  birthday,
  sex
) {
  return dispatch => {
    dispatch({ type: userActionType.REGISTERUSER_START });
    dispatch(openLoading());
    // return a promise, but it is not required
    return (
      axios
        .post(config.serverBaseUrl + "/api/register", {
          email: email,
          password: password,
          nickname: nickname,
          birthday: birthday,
          sex: sex
        })
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        .then(function(userregisterd) {
          //console.log(userregisterd);
          //console.log(userregisterd.data.hasOwnProperty("errcode"));
          if (userregisterd.data.hasOwnProperty("errcode")) {
            // error
            console.log("An error occurred.", userregisterd.data.errmsg);
            dispatch({
              type: userActionType.REGISTERUSER_ERROR,
              err: userregisterd.data.errmsg
            });
            dispatch(closeLoading());
            dispatch(openAlert(userregisterd.data.errmsg));
          } else {
            // success
            dispatch({
              type: userActionType.REGISTERUSER_SUCCESS,
              userinfo: userregisterd.data
            });
            dispatch(closeLoading());
            dispatch(
              openAlert("注册成功", function() {
                dispatch(headerIndex());
                history.push("/");
              })
            );
          }
        })
        .catch(function(err) {
          console.log("An error occurred.", err);
          dispatch({ type: userActionType.REGISTERUSER_ERROR, err: err });
          dispatch(closeLoading());
          dispatch(openAlert(err));
        })
    );
  };
}

// thunk action creator
export function loginUser(history, email, password) {
  return dispatch => {
    dispatch({ type: userActionType.REGISTERUSER_START });
    dispatch(openLoading());
    // return a promise, but it is not required
    return (
      axios
        .post(config.serverBaseUrl + "/api/login", {
          email: email,
          password: password
        })
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        .then(function(userregisterd) {
          if (userregisterd.data.hasOwnProperty("errcode")) {
            // error
            console.log("An error occurred.", userregisterd.data.errmsg);
            dispatch({
              type: userActionType.LOGINUSER_ERROR,
              err: userregisterd.data.errmsg
            });
            dispatch(closeLoading());
            dispatch(openAlert(userregisterd.data.errmsg));
          } else {
            // success
            dispatch({
              type: userActionType.LOGINUSER_SUCCESS,
              userinfo: userregisterd.data
            });
            dispatch(closeLoading());
            dispatch(closeLoginDialog());
            dispatch(
              openAlert("登陆成功", function() {
                dispatch(headerIndex());
                history.push("/");
              })
            );
          }
        })
        .catch(function(err) {
          console.log("An error occurred.", err);
          dispatch({ type: userActionType.REGISTERUSER_ERROR, err: err });
          dispatch(closeLoading());
          dispatch(openAlert(err));
        })
    );
  };
}
