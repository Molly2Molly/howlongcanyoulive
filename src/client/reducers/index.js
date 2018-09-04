import { combineReducers } from "redux";
import counters from "./CounterReducer";
import todos from "./TodoReducer";
import visibilityFilter from "./VisibilityFilterReducer";
import { selectedSubreddit, postsBySubreddit } from "./RedditReducer";

const rootReducer = combineReducers({
  counters,
  todos,
  visibilityFilter,
  selectedSubreddit,
  postsBySubreddit
});

export default rootReducer;

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
// const todosExample = createReducer([], {
//   [ActionTypes.ADD_TODO]: (state, action) => {
//     const text = action.text.trim();
//     return [...state, text];
//   }
// });
