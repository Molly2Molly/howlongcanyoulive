export const backStatusType = {
  hide: "hide",
  show: "show"
};
export const loginStatusType = {
  login: "login",
  logout: "logout",
  user: "user",
  hide: "hide"
};
export const titleType = {
  default: "How Long Can You Live"
};

export const headerActionType = {
  REFRESHTITLE: "REFRESHTITLE",
  CHANGEBACKSTATUS: "CHANGEBACKSTATUS",
  CHANGELOGINSTATUS: "CHANGELOGINSTATUS"
};

export function refreshTitle(title) {
  return {
    type: headerActionType.REFRESHTITLE,
    title: title ? title : titleType.default
  };
}

export function changeBackStatus(backStatus) {
  return {
    type: headerActionType.CHANGEBACKSTATUS,
    backStatus: backStatus
  };
}

export function changeLoginStatus(loginStatus) {
  return {
    type: headerActionType.CHANGELOGINSTATUS,
    loginStatus: loginStatus
  };
}

export function headerBackAndTitle(title) {
  return dispatch => {
    dispatch(refreshTitle(title));
    dispatch(changeBackStatus(backStatusType.show));
    //dispatch(changeLoginStatus(loginStatusType.hide));
  };
}

export function headerIndex() {
  return dispatch => {
    dispatch(refreshTitle());
    dispatch(changeBackStatus(backStatusType.hide));
  };
}
