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
import cssstyles from "../css/app.less";

const styles = {
  root: { height: "3.5rem" },
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
    const { classes, headerState, userState } = this.props;
    return (
      <AppBar className={cssstyles.header}>
        {/*position="absolute"*/}
        <Toolbar className={classes.root}>
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
          {!userState.email && (
            <Button
              color="inherit"
              className={classes.login}
              onClick={this.handelLoginClick}
            >
              登陆
            </Button>
          )}

          {/*userState.email && (
              <Button
                color="inherit"
                className={classes.login}
                onClick={this.handelLoginClick}
              >
                登出
              </Button>
            )*/}
          {userState.email && (
            <Button color="inherit" className={classes.login}>
              {userState.nickname}
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
