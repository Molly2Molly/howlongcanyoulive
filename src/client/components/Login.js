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
  alink: {
    display: "block",
    fontSize: "14px",
    marginTop: theme.gap,
    marginBottom: theme.gap,
    color: theme.fontcolor
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeLoginDialog());
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <div>
        <Dialog
          open={userState.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">登陆</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="邮箱"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="密码"
              type="password"
              fullWidth
            />
            <DialogContentText>
              <a href="/register" className={classes.alink}>
                还没账号？去注册
              </a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleClose} color="primary">
              登陆
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Login));
