import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridIndex from "./components/GridIndex";
import styles from "./css/app.less";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#393939" },
    secondary: { main: "#FF7F5B" },
    error: { main: "#EC6108" }
  },
  status: {
    danger: "orange"
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 16
  }
});

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
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/">
          {/* basename='/dist'*/}
          <Switch>
            <Route exact path="/" component={GridIndex} />
            {/*
            <Route path="/user/:userId" component={User} />
            <PrivateRoute
              path="/counter"
              component={CounterApp}
              store={this.props.store}
            />
            <Route path="/todo/:filter?" component={TodoApp} />
            <Route path="/async" component={AsyncApp} />
          */}
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </MuiThemeProvider>
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

export default hot(module)(App);
