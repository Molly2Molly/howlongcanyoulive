import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import moment from "moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeLoginDialog, loginUser } from "../actions/UserAction";
import cssstyles from "../css/app.less";

const styles = theme => ({
  alink: {
    display: "block",
    fontSize: "14px",
    marginTop: theme.gap,
    marginBottom: theme.gap,
    color: theme.fontColor
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailMsg: "",
      passwordMsg: ""
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.gotoRegister = this.gotoRegister.bind(this);
  }

  handleClose() {
    this.props.dispatch(closeLoginDialog());
  }

  gotoRegister(e) {
    //e.preventDefault();
    //this.props.dispatch(headerBackAndTitle("注册"));
    this.props.dispatch(closeLoginDialog());
    //this.props.history.push("/register");
  }

  handleChange(name) {
    var _that = this;
    return function(event) {
      _that.setState(
        {
          [name]: event.target.value
        },
        function() {
          //console.log(_that.state);
        }
      );
    };
  }

  handleLogin() {
    const loginConstraints = {
      email: {
        presence: {
          allowEmpty: false,
          message: "请填写邮箱"
        },
        email: {
          message: "不是个有效的邮箱哦"
        }
      },
      password: {
        length: {
          minimum: 6,
          maximum: 12,
          tooShort: "密码长度不能小于6位",
          tooLong: "密码长度不能大于12位"
        }
      }
    };

    const validateResults = validate(this.state, loginConstraints, {
      fullMessages: false
    });
    this.setState({
      emailMsg:
        validateResults && validateResults.email
          ? validateResults.email[0]
          : "",
      passwordMsg:
        validateResults && validateResults.password
          ? validateResults.password[0]
          : ""
    });

    if (!validateResults) {
      this.props.dispatch(
        loginUser(this.props.history, this.state.email, this.state.password)
      );
    }
  }

  render() {
    const { classes, userState, dispatch } = this.props;
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
              value={this.state.email}
              onChange={this.handleChange("email")}
              error={this.state.emailMsg ? true : false}
              helperText={this.state.emailMsg}
            />
            <TextField
              margin="dense"
              id="password"
              label="密码"
              type="password"
              fullWidth
              value={this.state.password}
              onChange={this.handleChange("password")}
              error={this.state.passwordMsg ? true : false}
              helperText={this.state.passwordMsg}
            />
            <DialogContentText>
              <Link
                to="/register"
                className={classes.alink}
                onClick={this.gotoRegister}
              >
                还没账号？去注册
              </Link>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleLogin} color="primary">
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
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Login)));
