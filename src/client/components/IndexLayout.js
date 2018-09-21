import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import cssstyles from "../css/app.less";
import ButtonAppBar from "./ButtonAppBar";
import BottomAppNavigation from "./BottomAppNavigation";
import Timeleft from "./Timeleft";

const styles = {
  root: {},
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  login: {
    textTransform: "none"
  }
};

class IndexLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handelLoginClick = this.handelLoginClick.bind(this);
  }

  handelLoginClick() {
    this.props.dispatch(openLoginDialog());
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <React.Fragment>
        <ButtonAppBar />
        <div className={cssstyles.centerContainer}>
          <div>
            {userState.birthday && (
              <Route
                exact
                path="/"
                render={props => {
                  return <Timeleft />;
                }}
              />
            )}
            {/*
                <Route exact path="/" component={Timeleft} />
                <Route path="/user/:userId" component={User} />
                <PrivateRoute
                  path="/counter"
                  component={CounterApp}
                  store={this.props.store}
                />
                <Route path="/todo/:filter?" component={TodoApp} />
              */}
          </div>
        </div>
        <BottomAppNavigation />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

IndexLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(IndexLayout));
