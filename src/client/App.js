import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import CounterApp from "./components/CounterApp";
import AsyncApp from "./components/containers/AsyncApp";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Component {...props} {...rest} />;
    }}
  />
);

class App extends React.Component {
  render() {
    // basename='/dist'
    return (
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/user/:userId" component={User} />
          <PrivateRoute
            path="/counter"
            component={CounterApp}
            store={this.props.store}
          />
          <Route path="/todo/:filter?" component={TodoApp} />
          <Route path="/async" component={AsyncApp} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
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
        <Link to="/todo">todo</Link>
        <br />
        <Link to="/counter">counter</Link>
        <br />
        <Link to="/async">async</Link>
        <br />
        <Link to="/other">other</Link>
      </div>
    );
  }
}

class User extends React.Component {
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.match);
    console.log(this.props.location);
    console.log(this.props.history);
  }
  render() {
    return (
      <div className="User">
        <Link to="/">Back</Link>
        <br />
        User {this.props.match.params.userId}
      </div>
    );
  }
}

class NoMatch extends React.Component {
  render() {
    return (
      <div className="NoMatch">
        <Link to="/">Back</Link>
        <br />
        NoMatch
      </div>
    );
  }
}

export default App;
