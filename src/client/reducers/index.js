import { combineReducers } from "redux";
import undoable from "./enhancers/UndoableReducerEnhancer";
import counters from "./CounterReducer";
import todos from "./TodoReducer";
import visibilityFilter from "./VisibilityFilterReducer";
import { selectedSubreddit, postsBySubreddit } from "./RedditReducer";

const undoableTodos = undoable(todos);

const rootReducer = combineReducers({
  counters,
  todos: undoableTodos,
  visibilityFilter,
  selectedSubreddit,
  postsBySubreddit
});

export default rootReducer;

// function createReducer(initialState, handlers) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action);
//     } else {
//       return state;
//     }
//   };
// }
// const todosExample = createReducer([], {
//   [ActionTypes.ADD_TODO]: (state, action) => {
//     const text = action.text.trim();
//     return [...state, text];
//   }
// });

// // combine reducers might look like that
// function combineReducers(reducers) {
//   return function(state = {}, action) {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       // call every reducer with the part of the state it manages
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// }
