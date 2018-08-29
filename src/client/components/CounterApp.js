import React from 'react';
import Counter from './Counter';
import CounterAction from '../actions/CounterAction';

export default class CounterApp extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        counterValue : props.store.getState().counters
      };
      this.updateCounter = this.updateCounter.bind(this);
      props.store.subscribe(this.updateCounter);
    }
  
    updateCounter() {
      this.setState({
        counterValue : this.props.store.getState().counters
      });
    }
    
    render() {
      return (
        <Counter 
                value={this.state.counterValue}
                onIncrement={()=>{
                    this.props.store.dispatch({type:CounterAction.INCREMENT})
                }}
                onDecrement={()=>{
                    this.props.store.dispatch({type:CounterAction.DECREMENT})
                }}
              />
      );
    }
  }