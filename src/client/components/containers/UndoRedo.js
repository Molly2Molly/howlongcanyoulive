import React from "react";
import { connect } from "react-redux";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

const mapStateToProps = state => {
  console.log(state);
  return {
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch({ type: "UNDO" }),
    onRedo: () => dispatch({ type: "REDO" })
  };
};

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedo;
