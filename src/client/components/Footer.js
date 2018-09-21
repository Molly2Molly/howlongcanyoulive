import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import cssstyles from "../css/app.less";

const styles = {
  root: {}
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, value) {
    this.setState({ value }, function() {
      console.log(this.state.value);
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleClick}
        showLabels
        className={classes.root + " " + cssstyles.footer}
      >
        <BottomNavigationAction label="我的" icon={<HomeIcon />} />
        <BottomNavigationAction label="聊天室" icon={<GroupIcon />} />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
