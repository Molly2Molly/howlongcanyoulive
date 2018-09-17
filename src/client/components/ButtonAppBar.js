import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openLoginDialog } from "../actions/UserAction";
import {
  backStatusType,
  loginStatusType,
  headerIndex
} from "../actions/HeaderAction";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

const styles = {
  root: {},
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 0
  },
  login: {
    textTransform: "none"
  }
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handelLoginClick = this.handelLoginClick.bind(this);
  }

  handelLoginClick() {
    this.props.dispatch(openLoginDialog());
  }

  render() {
    const { classes, headerState } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {headerState.backStatus == backStatusType.show && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Back"
                onClick={() => {
                  this.props.dispatch(headerIndex());
                  this.props.history.goBack();
                }}
              >
                <ArrowBackIos />
              </IconButton>
            )}
            <div className={classes.grow}>{headerState.title}</div>
            {headerState.loginStatus == loginStatusType.login && (
              <Button
                color="inherit"
                className={classes.login}
                onClick={this.handelLoginClick}
              >
                登陆
              </Button>
            )}
            {headerState.loginStatus == loginStatusType.logout && (
              <Button
                color="inherit"
                className={classes.login}
                onClick={this.handelLoginClick}
              >
                登出
              </Button>
            )}
            {headerState.loginStatus == loginStatusType.user && (
              <Button
                color="inherit"
                className={classes.login}
                onClick={this.handelLoginClick}
              >
                用户
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userState, headerState } = state;
  return { userState, headerState };
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  headerState: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(ButtonAppBar))
);
