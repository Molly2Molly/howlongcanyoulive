import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from '../../actions/TodoAction';
import TodoList from '../TodoList';

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case VisibilityFilters.SHOW_COMPLETED : return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE : return todos.filter(t => !t.completed);
        case VisibilityFilters.SHOW_ALL : 
        default : return todos;
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        todos : getVisibleTodos(state.todos, state.visibilityFilter)
        //todos : getVisibleTodos(state.todos, ownProps.filter)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick : id => {
            dispatch(toggleTodo(id));
        }
    }
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;