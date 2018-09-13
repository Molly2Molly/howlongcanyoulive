import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from "./ButtonAppBar";
import BottomAppNavigation from "./BottomAppNavigation";
import Timeleft from "./Timeleft";
import styles from "../css/app.less";

const classes = theme => ({
  root: { flexGrow: 1 },
  main: { flexGrow: 1, padding: theme.gap }
});

class GridIndex extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} direction="column" className={classes.root}>
        <ButtonAppBar />
        <div className={styles.index_time_page}>
          <Timeleft />
        </div>
        <BottomAppNavigation />
      </Grid>
    );
  }
}

GridIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(GridIndex);
