import React from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
import moment from "moment";
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
      sex: "male",
      emailMsg: "",
      passwordMsg: "",
      nicknameMsg: "",
      birthdayMsg: "",
      sexMsg: ""
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
    // Before using it we must add the parse and format functions
    validate.extend(validate.validators.datetime, {
      parse: function(value, options) {
        return +moment(value);
      },
      format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment(value).format(format);
      }
    });

    const registerConstraints = {
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
      },
      nickname: {
        presence: {
          allowEmpty: false,
          message: "请填写昵称"
        }
      },
      birthday: {
        presence: {
          allowEmpty: false,
          message: "请选择生日"
        },
        datetime: {
          //dateOnly: true,
          latest: moment().format("YYYY-MM-DD"),
          earliest: moment()
            .subtract(80, "years")
            .format("YYYY-MM-DD"),
          tooEarly: "抱歉，您的年龄太大了，已无法估算您的剩余存活时间",
          tooLate: "emmmmm, 难道您是穿越回来的？",
          notValid: "生日格式不对哦"
        }
      },
      sex: {
        presence: {
          message: "请选择性别"
        }
      }
    };

    const validateResults = validate(this.state, registerConstraints, {
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
          : "",
      nicknameMsg:
        validateResults && validateResults.nickname
          ? validateResults.nickname[0]
          : "",
      birthdayMsg:
        validateResults && validateResults.birthday
          ? validateResults.birthday[0]
          : "",
      sexMsg:
        validateResults && validateResults.sex ? validateResults.sex[0] : ""
    });

    if (!validateResults) {
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
          error={this.state.emailMsg ? true : false}
          helperText={this.state.emailMsg}
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
          error={this.state.passwordMsg ? true : false}
          helperText={this.state.passwordMsg}
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
          error={this.state.nicknameMsg ? true : false}
          helperText={this.state.nicknameMsg}
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
          error={this.state.birthdayMsg ? true : false}
          helperText={this.state.birthdayMsg}
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
          error={this.state.sexMsg ? true : false}
          helperText={this.state.sexMsg}
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
