import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { openAlert } from "../actions/AlertAction";
import { openLoginDialog } from "../actions/UserAction";

const styles = {};

class LoginHigherOrder extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, history } = this.props;
    // not login
    if (!this.props.userState.email) {
      dispatch(
        openAlert("请先登录", function() {
          history.push("/");
          dispatch(openLoginDialog());
        })
      );
    }
  }

  render() {
    return this.props.children;
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

LoginHigherOrder.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(LoginHigherOrder))
);
