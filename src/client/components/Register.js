import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { closeLoginDialog, registerUser } from "../actions/UserAction";
import cssstyles from "../css/app.less";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit
  }
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickname: "",
      birthday: "",
      sex: "male"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.userState.email) {
      this.props.history.goBack();
    }
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

  handleSubmit() {
    this.props.dispatch(
      registerUser(
        this.props.history,
        this.state.email,
        this.state.password,
        this.state.nickname,
        this.state.birthday,
        this.state.sex
      )
    );
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        id="registerForm"
      >
        <TextField
          required
          autoFocus
          id="email"
          label="邮箱"
          type="email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange("email")}
          margin="normal"
          fullWidth
        />
        <TextField
          required
          id="password"
          label="密码"
          type="password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange("password")}
          margin="normal"
          fullWidth
        />
        <TextField
          required
          id="nickname"
          label="昵称"
          type="text"
          className={classes.textField}
          value={this.state.nickname}
          onChange={this.handleChange("nickname")}
          margin="normal"
          fullWidth
        />
        <TextField
          required
          id="birthday"
          label="生日"
          type="date"
          className={classes.textField}
          value={this.state.birthday}
          onChange={this.handleChange("birthday")}
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          required
          select
          id="sex"
          label="性别"
          type="text"
          className={classes.textField}
          value={this.state.sex}
          onChange={this.handleChange("sex")}
          margin="normal"
          fullWidth
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText=""
        >
          <MenuItem key={1} value={"male"}>
            男
          </MenuItem>
          <MenuItem key={2} value={"female"}>
            女
          </MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          className={cssstyles.button}
          fullWidth
          onClick={this.handleSubmit}
        >
          确认
        </Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Register))
);
