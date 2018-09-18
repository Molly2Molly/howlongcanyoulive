export const backStatusType = {
  hide: "hide",
  show: "show"
};

export const titleType = {
  default: "How Long Can You Live"
};

export const headerActionType = {
  REFRESHTITLE: "REFRESHTITLE",
  CHANGEBACKSTATUS: "CHANGEBACKSTATUS"
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

export function headerBackAndTitle(title) {
  return dispatch => {
    dispatch(refreshTitle(title));
    dispatch(changeBackStatus(backStatusType.show));
  };
}

export function headerIndex() {
  return dispatch => {
    dispatch(refreshTitle());
    dispatch(changeBackStatus(backStatusType.hide));
  };
}
