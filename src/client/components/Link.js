import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { VisibilityFilters } from '../actions/TodoAction';

const Link = ({active, children, onClick, filter}) => {
    if(active) {
        return <span>{children}</span>;
    }
    return (
        <a href="" onClick={e => {e.preventDefault();onClick();}}>
            {children}
        </a>
        // <NavLink 
        //     to={ filter === VisibilityFilters.SHOW_ALL ? '/todo/' : `/todo/${filter}`}
        //     activeStyle={{textDecoration:'none',color:'black'}}
        // >{children}</NavLink>
    );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link;