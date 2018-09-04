function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

let nextTodoId = 0;
export const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});

// export const setVisibilityFilter = filter => ({
//   type: "SET_VISIBILITY_FILTER",
//   filter
// });
export const setVisibilityFilter = makeActionCreator(
  "SET_VISIBILITY_FILTER",
  "filter"
);

// export const toggleTodo = id => ({
//   type: "TOGGLE_TODO",
//   id
// });
export const toggleTodo = makeActionCreator("TOGGLE_TODO", "id");

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};
