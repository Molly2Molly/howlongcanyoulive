import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { closeAlert } from "../actions/AlertAction";
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
    margin: theme.gap,
    padding: "0 " + theme.gap,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
  }
});

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, alertState } = this.props;
    this.timer = setTimeout(function() {
      dispatch(closeAlert());
      if (alertState.callback) {
        alertState.callback();
      }
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

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

function mapStateToProps(state) {
  const { userState, alertState } = state;
  return { userState, alertState };
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Alert));
