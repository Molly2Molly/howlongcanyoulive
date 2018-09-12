import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => {
  root: {
  }
};

class Timeleft extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          Timeleft
        </Paper>
      </React.Fragment>
    );
  }
}

Timeleft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Timeleft);
