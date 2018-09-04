export default function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      return next(action);
    }
    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.");
    }
    if (typeof callAPI !== "function") {
      throw new Error("Expected callAPI to be a function.");
    }
    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;
    dispatch(Object.assign({}, payload, { type: requestType }));

    return callAPI().then(
      response =>
        dispatch(Object.assign({}, payload, { response, type: successType })),
      error =>
        dispatch(Object.assign({}, payload, { error, type: failureType }))
    );
  };
}

// export function loadPosts(userId) {
//   return {
//     types: ["LOAD_POSTS_REQUEST", "LOAD_POSTS_SUCCESS", "LOAD_POSTS_FAILURE"],
//     shouldCallAPI: state => !state.posts[userId],
//     callAPI: () => fetch(`http://myapi.com/users/${userId}/posts`),
//     payload: { userId }
//   };
// }
// export function loadComments(postId) {
//   return {
//     types: [
//       "LOAD_COMMENTS_REQUEST",
//       "LOAD_COMMENTS_SUCCESS",
//       "LOAD_COMMENTS_FAILURE"
//     ],
//     shouldCallAPI: state => !state.comments[postId],
//     callAPI: () => fetch(`http://myapi.com/posts/${postId}/comments`),
//     payload: { postId }
//   };
// }
// export function addComment(postId, message) {
//   return {
//     types: [
//       "ADD_COMMENT_REQUEST",
//       "ADD_COMMENT_SUCCESS",
//       "ADD_COMMENT_FAILURE"
//     ],
//     callAPI: () =>
//       fetch(`http://myapi.com/posts/${postId}/comments`, {
//         method: "post",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message })
//       }),
//     payload: { postId, message }
//   };
// }
