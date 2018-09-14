import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { closeLoginDialog } from "../actions/UserAction";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import cssstyles from "../css/app.less";

const styles = theme => ({
  alink: {}
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeLoginDialog());
  }

  render() {
    const { classes, userState } = this.props;
    return <div>Register</div>;
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Register));
