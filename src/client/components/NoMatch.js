import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NoMatch">
        <Link to="/">Back</Link>
        <br />
        Sorry, the path is invalid.
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(NoMatch))
);
