import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import LoginHigherOrder from "./components/LoginHigherOrder";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Alert from "./components/Alert";
import NoMatch from "./components/NoMatch";
import Register from "./components/Register";
import Chat from "./components/Chat";
import { GlobalContext } from "./Context";

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
    // htmlFontSize: 0
  },
  fontSize: "16px",
  fontColor: "#393939",
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
  root: { height: "100%" }
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
            className={cssstyles.gridroot}
          >
            <Switch>
              <Route exact path="/" component={IndexLayout} />
              <Route
                path="/register"
                render={props => (
                  <HeadLayout>
                    <Register />
                  </HeadLayout>
                )}
              />
              <GlobalContext.Consumer>
                {context => (
                  <Route
                    path="/chat"
                    render={props => (
                      <LoginHigherOrder>
                        <HeadLayout>
                          <Chat />
                        </HeadLayout>
                      </LoginHigherOrder>
                    )}
                  />
                )}
              </GlobalContext.Consumer>

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
            {this.props.loadingState.isOpen && (
              <Loading
                isOpen={this.props.loadingState.isOpen}
                title={this.props.loadingState.title}
              />
            )}
            {this.props.alertState.isOpen && (
              <Alert
                isOpen={this.props.alertState.isOpen}
                title={this.props.alertState.title}
              />
            )}
          </Grid>
        </Router>
      </MuiThemeProvider>
    );
  }
}

// class User extends React.Component {
//   componentDidMount() {
//     console.log(this.props);
//     console.log(this.props.match);
//     console.log(this.props.location);
//     console.log(this.props.history);
//   }
//   render() {
//     return (
//       <div className="User">
//         <Link to="/">Back</Link>
//         <br />
//         User {this.props.match.params.userId}
//       </div>
//     );
//   }
// }

function mapStateToProps(state) {
  const { loadingState, alertState } = state;
  return { loadingState, alertState };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired
};

export default hot(module)(connect(mapStateToProps)(withStyles(styles)(App)));
