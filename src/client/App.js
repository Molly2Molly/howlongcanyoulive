import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import cssstyles from "./css/app.less";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IndexLayout from "./components/IndexLayout";
import HeadLayout from "./components/HeadLayout";
import Login from "./components/Login";

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
  },
  fontcolor: "#393939",
  gap: "10px"
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Component {...props} {...rest} />;
    }}
  />
);

const styles = theme => ({
  root: { flexGrow: 1 }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename="/">
          {/* basename='/dist'*/}
          <Grid
            container
            spacing={0}
            direction="column"
            className={classes.root}
          >
            <Switch>
              <Route exact path="/" component={IndexLayout} />
              <Route path="/test" component={IndexLayout} />
              <Route path="/register" component={HeadLayout} />
              <Route component={NoMatch} />
              {/*
                <Route path="/user/:userId" component={User} />
                <PrivateRoute
                  path="/counter"
                  component={CounterApp}
                  store={this.props.store}
                />
                <Route path="/todo/:filter?" component={TodoApp} />
              */}
            </Switch>
            <Login />
          </Grid>
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

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default hot(module)(withStyles(styles)(App));
