import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openLoginDialog, logoutUser } from "../actions/UserAction";
// import { backStatusType, titleType } from "../actions/HeaderAction";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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

const backStatusType = {
  hide: "hide",
  show: "show"
};

const titleType = {
  default: "How Long Can You Live"
};

const mapRouterToHeader = {
  "/": {
    backStatus: backStatusType.hide,
    title: titleType.default
  },
  "/register": {
    backStatus: backStatusType.show,
    title: "注册"
  },
  "/chat": {
    backStatus: backStatusType.show,
    title: "聊天室"
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      backStatus: backStatusType.hide,
      title: titleType.default
    };
    // 不同路径显示不同状态的header
    console.log(mapRouterToHeader[this.props.location.pathname]);
    if (mapRouterToHeader[this.props.location.pathname]) {
      this.state.backStatus =
        mapRouterToHeader[this.props.location.pathname].backStatus;
      this.state.title = mapRouterToHeader[this.props.location.pathname].title;
    }

    this.handelLoginClick = this.handelLoginClick.bind(this);
    this.handlerLogoutClick = this.handlerLogoutClick.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  handelLoginClick() {
    this.props.dispatch(openLoginDialog());
  }

  handlerLogoutClick() {
    const that = this;
    this.props.dispatch(
      logoutUser(function() {
        // that.setState({
        //   openDrawer: false
        // });
      })
    );
  }

  toggleDrawer(side, open) {
    var _that = this;
    return function(event) {
      _that.setState(
        {
          [side]: open
        },
        function() {
          //console.log(_that.state);
        }
      );
    };
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <AppBar className={cssstyles.header}>
        {/*position="absolute"*/}
        <Toolbar className={classes.root}>
          {this.state.backStatus == backStatusType.show && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Back"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}
          <div className={classes.grow}>{this.state.title}</div>
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
            <Button
              color="inherit"
              className={classes.login}
              onClick={this.toggleDrawer("openDrawer", true)}
            >
              {userState.nickname}
            </Button>
          )}
        </Toolbar>
        <Drawer
          anchor="right"
          open={this.state.openDrawer}
          onClick={this.toggleDrawer("openDrawer", false)}
          onKeyDown={this.toggleDrawer("openDrawer", false)}
          onClose={this.toggleDrawer("openDrawer", false)}
        >
          <div tabIndex={0} role="button" className={cssstyles.drawerRight}>
            <div className={classes.list}>
              <List>{userState.nickname}</List>
              <Divider />
              <List
                onClick={this.handlerLogoutClick}
                onKeyDown={this.handlerLogoutClick}
              >
                登出
              </List>
              <Divider />
            </div>
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Header)));
