export const headerActionType = {
  REFRESHHEADER: "REFRESHHEADER",
  SHOWBACK: "SHOWBACK",
  HIDEBACK: "HIDEBACK"
};

export function refreshHeader(title) {
  return {
    type: headerActionType.REFRESHHEADER,
    title: title
  };
}

export function showBack() {
  return {
    type: headerActionType.SHOWBACK
  };
}

export function hideBack() {
  return {
    type: headerActionType.HIDEBACK
  };
}
