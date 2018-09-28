import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
// import { headerBackAndTitle } from "../actions/HeaderAction";
import cssstyles from "../css/app.less";

const styles = {
  root: {}
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, value) {
    switch (value) {
      case "index":
        this.props.history.push("/");
        break;
      // case "chat":
      //   this.props.dispatch(headerBackAndTitle("聊天室"));
      default:
        this.props.history.push("/" + value);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation
        onChange={this.handleClick}
        showLabels
        className={classes.root + " " + cssstyles.footer}
      >
        <BottomNavigationAction
          label="我的"
          value="index"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="聊天室"
          value="chat"
          icon={<GroupIcon />}
        />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Footer)));
