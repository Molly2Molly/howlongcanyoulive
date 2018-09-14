import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openLoginDialog } from "../actions/UserAction";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

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

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.handelLoginClick = this.handelLoginClick.bind(this);
  }

  handelLoginClick() {
    this.props.dispatch(openLoginDialog());
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.grow}>How Long Can You Live</div>
            <Button
              color="inherit"
              className={classes.login}
              onClick={this.handelLoginClick}
            >
              登陆
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));
