import CounterAction from '../actions/CounterAction';

// Object.assign({}, state, {visibilityFilter: action.filter})
// { ...state, ...newState }
export default (state = 0, action) => {
  switch(action.type) {
    case CounterAction.INCREMENT : return state + 1;
    case CounterAction.DECREMENT : return state - 1;
    default : return state;
  }
}