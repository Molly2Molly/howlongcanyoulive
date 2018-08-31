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
