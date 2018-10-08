import React from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import cssstyles from "../css/app.less";

const styles = theme => ({
  chatroom: {
    fontSize: "14px"
  },
  chatitem: {
    marginBottom: "10px"
  },
  chatdot: {
    width: "10px",
    height: "10px",
    marginRight: "10px",
    borderRadius: "50%"
  }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.emit("chat message", "run into chatroom");
  }

  componentDidMount() {}

  render() {
    const { classes, userState } = this.props;
    return (
      <div className={cssstyles.chatroom + " " + classes.chatroom}>
        <div>
          <div className={cssstyles.chatitem + " " + classes.chatitem}>
            <div>
              <span
                className={classes.chatdot}
                style={{ backgroundColor: userState.bgcolor }}
              />
              TESTUSERNAME&nbsp;&nbsp;进入了聊天室
            </div>
          </div>
          <div className={cssstyles.chatitem + " " + classes.chatitem}>
            <div>
              <span
                className={classes.chatdot}
                style={{ backgroundColor: userState.bgcolor }}
              />
              <span>TESTUSERNAMETESTUSERNAMETESTUSERNAMETESTUSERNAME</span>
              <span>10月8 10:52</span>
            </div>
            <div>
              吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧吧啦吧啦吧啦吧啦吧
            </div>
          </div>
        </div>
        <div>
          <Input
            defaultValue=""
            inputProps={{
              "aria-label": "说点什么...",
              placeholder: "说点什么..."
            }}
          />
          <Button variant="contained" color="primary">
            发送
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Chat)));
