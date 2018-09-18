import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import teal from "@material-ui/core/colors/teal";
import cssstyles from "../css/app.less";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  loading: {
    margin: "0 auto"
  },
  dialogTitle: {
    fontSize: theme.fontSize,
    color: theme.fontColor,
    margin: "0 " + theme.gap + " " + theme.gap,
    padding: "0 " + theme.gap,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
  }
});

class SimpleLoading extends React.Component {
  render() {
    const { classes, title, isOpen } = this.props;
    return (
      <Dialog open={isOpen}>
        {this.props.children}
        {title && <div className={classes.dialogTitle}>{title}</div>}
      </Dialog>
    );
  }
}
SimpleLoading.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired
};
const SimpleLoadingWrap = withStyles(styles)(SimpleLoading);

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, title, isOpen } = this.props;
    return (
      <SimpleLoadingWrap isOpen={isOpen} title={title}>
        <div className={classes.loading}>
          <CircularProgress
            className={classes.progress}
            style={{ color: teal[500] }}
            thickness={4}
          />
        </div>
      </SimpleLoadingWrap>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Loading));
