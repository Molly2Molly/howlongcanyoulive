export const alertActionType = {
  OPENALERT: "OPENALERT",
  CLOSEALERT: "CLOSEALERT"
};

export function openAlert(title, callback) {
  return {
    type: alertActionType.OPENALERT,
    title: title ? title : "",
    callback: callback ? callback : ""
  };
}
export function closeAlert() {
  return { type: alertActionType.CLOSEALERT };
}
