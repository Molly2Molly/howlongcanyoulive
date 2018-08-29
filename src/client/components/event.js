import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    // This syntax ensures `this` is bound within handleClick. public class fields syntax
    // Warning: this is *experimental* syntax.
    // handleClick = () => {
    //     console.log('this is:', this);
    //     this.setState(prevState => ({
    //         isToggleOn: !prevState.isToggleOn
    //     }));
    // }
  
    render() {
      return (
        // This syntax ensures `this` is bound within handleClick
        // The problem with this syntax is that a different callback is created each time renders.
        // In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.
        // onClick={(e) => this.handleClick(e)}

        // passing arguments to event handlers
        // onClick={(e) => this.deleteRow(id, e)}
        // onClick={this.deleteRow.bind(this, id)}
        
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }