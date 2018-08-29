import React from 'react';
export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  /* lifecycle hooks */
  componentWillMount() {

  }

  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps() {

  }
  componentWillUpdate() {

  }
  componentDidUpdate() {

  }

  tick() {
    this.setState({
      date: new Date()
    });
    // Correct - this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state
    // this.setState((prevState, props) => ({
    //     counter: prevState.counter + props.increment
    // }));
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}