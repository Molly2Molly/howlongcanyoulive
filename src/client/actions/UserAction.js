import fetch from "cross-fetch";

export const userActionType = {
  OPENLOGINDIALOG: "OPENLOGINDIALOG",
  CLOSELOGINDIALOG: "CLOSELOGINDIALOG",
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

// thunk action creator
export function registerUser(email, password, nickname, birthday, sex) {
  return dispatch => {
    dispatch({ type: userActionType.REGISTERUSER_START });
    // return a promise, but it is not required
    return (
      // undo
      fetch(`https://www.reddit.com/r/${subreddit}.json`)
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        .then(
          response => response.json(),
          error => {
            console.log("An error occurred.", error);
            dispatch({ type: userActionType.REGISTERUSER_ERROR, error: error });
          }
        )
        .then(json => {
          dispatch({
            type: userActionType.REGISTERUSER_SUCCESS,
            userinfo: json
          });
        })
    );
  };
}

// thunk action creator
export function loginUser(email, password) {
  return dispatch => {
    dispatch({ type: userActionType.LOGINUSER_START });
    // return a promise, but it is not required
    return (
      // undo
      fetch(`https://www.reddit.com/r/${subreddit}.json`)
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        .then(
          response => response.json(),
          error => {
            console.log("An error occurred.", error);
            dispatch({ type: userActionType.LOGINUSER_ERROR, error: error });
          }
        )
        .then(json => {
          dispatch({
            type: userActionType.LOGINUSER_SUCCESS,
            userinfo: json
          });
        })
    );
  };
}
