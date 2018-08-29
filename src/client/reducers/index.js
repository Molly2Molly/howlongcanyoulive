import { combineReducers } from 'redux';
import counters from './CounterReducer';
import todos from './TodoReducer';
import visibilityFilter from './VisibilityFilterReducer';

const rootReducer = combineReducers({
    counters,
    todos,
    visibilityFilter
});

export default rootReducer;