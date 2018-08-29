import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoApp from './components/TodoApp';

import Counter from './components/Counter';
import CounterAction from './actions/CounterAction';

import rootReducer from './reducers';
const store = createStore(rootReducer);

class App extends React.Component {
  render() {
    // basename='/dist'
    return (
      <Provider store={store}>
      <Router basename='/'>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/user/:userId" component={User}/>
          <Route path="/counter" component={CounterApp}/>
          <Route path="/todo" component={TodoApp}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
      </Provider>
    );
  }
}

class Index extends React.Component {
  render() {
    return (
      <div className="Index">
        <Link to={`/user/123`}>user one</Link>
        <br />
        <Link to={`/user/456`}>user two</Link>
        <br />
        <Link to='/todo'>todo</Link>
        <br />
        <Link to='/counter'>counter</Link>
        <br />
        <Link to='/other'>other</Link>
      </div>
    );
  }
}

class CounterApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counterValue : store.getState().counters
    };
    this.updateCounter = this.updateCounter.bind(this);
    store.subscribe(this.updateCounter);
  }

  updateCounter() {
    this.setState({
      counterValue : store.getState().counters
    });
  }
  
  render() {
    return (
      <Counter 
              value={this.state.counterValue}
              onIncrement={()=>{store.dispatch({type:CounterAction.INCREMENT})}}
              onDecrement={()=>{store.dispatch({type:CounterAction.DECREMENT})}}
            />
    );
  }
}

class User extends React.Component {
  componentDidMount() {
    console.log(this.props.match);
    console.log(this.props.location);
    console.log(this.props.history);
  }
  render() {
    return (
      <div className="User">
        <Link to='/'>Back</Link>
        <br/>
        User {this.props.match.params.userId}
      </div>
    );
  }
}
class NoMatch extends React.Component {
  render() {
    return (
      <div className="NoMatch">
        <Link to='/'>Back</Link>
        <br/>
        NoMatch
      </div>
    );
  }
}

// getUserInfo().then(function(data) {
//   console.log(data)
// });

export default App;
