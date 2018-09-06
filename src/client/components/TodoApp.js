import React from "react";
import Footer from "./Footer";
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";
import { VisibilityFilters } from "../actions/TodoAction";
import UndoRedo from "./containers/UndoRedo";

const TodoApp = ({ match: { params } }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || VisibilityFilters.SHOW_ALL} />
    <Footer />
    <UndoRedo />
  </div>
);

export default TodoApp;
