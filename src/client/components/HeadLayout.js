import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import cssstyles from "../css/app.less";
import ButtonAppBar from "./ButtonAppBar";
import Register from "./Register";
import {} from "../actions/HeaderAction";

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

class HeadLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ButtonAppBar />
        <div className={cssstyles.centerContainer}>
          <div>
            <Route path="/register" component={Register} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { headerState } = state;
  return { headerState };
}

function mapDispatchToProps(dispatch) {
  return {};
}

HeadLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  headerState: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeadLayout));
