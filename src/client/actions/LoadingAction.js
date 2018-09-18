export const loadingActionType = {
  OPENLOADING: "OPENLOADING",
  CLOSELOADING: "CLOSELOADING"
};

export function openLoading(title) {
  return { type: loadingActionType.OPENLOADING, title: title ? title : "" };
}
export function closeLoading() {
  return { type: loadingActionType.CLOSELOADING };
}
