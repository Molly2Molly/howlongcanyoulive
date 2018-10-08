import React from "react";
import PropTypes from "prop-types";
import validate from "validate.js";
import moment from "moment";
import io from "socket.io-client";
import config from "../../../config";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { openAlert } from "../actions/AlertAction";
import cssstyles from "../css/app.less";

const styles = theme => ({
  chatroom: {
    fontSize: "14px"
  },
  chatitem: {
    marginBottom: "10px"
  },
  chatitemheader: {
    fontSize: "12px"
  },
  chatdot: {
    width: "10px",
    height: "10px",
    marginRight: "5px",
    borderRadius: "50%"
  }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      message: "",
      chatitems: []
    };
    this.chatRef = React.createRef();
    this.handleSendmessage = this.handleSendmessage.bind(this);
    this.addChatitem = this.addChatitem.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const that = this;
    const socket = io(config.serverBaseUrl);
    this.setState({
      socket: socket
    });
    socket.emit("message", this.props.userState);
    socket.on("message", function(data) {
      that.addChatitem(data);
    });
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  componentDidUpdate() {
    const node = this.chatRef.current;
    node.scrollTop = node.scrollHeight - node.clientHeight;
  }

  addChatitem(data, callback) {
    const that = this;
    that.state.chatitems.push(data);
    that.setState(
      {
        message: "",
        chatitems: that.state.chatitems
      },
      function() {
        if (callback) callback();
      }
    );
  }

  handleMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleKeyUp(e) {
    if (parseInt(e.keyCode) == 13) {
      //回车
      this.handleSendmessage();
    }
  }

  handleSendmessage() {
    const that = this;
    if (!this.state.message) {
      this.props.dispatch(openAlert("先说点什么吧..."));
      return;
    }
    const data = Object.assign({}, this.props.userState, {
      message: this.state.message,
      messagetime: moment().format("MM月DD HH:mm")
    });
    this.addChatitem(data, function() {
      that.state.socket.emit("message", data);
    });
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <div className={cssstyles.chatroom + " " + classes.chatroom}>
        <div ref={this.chatRef}>
          {this.state.chatitems.map((chatitem, index) => {
            if (!chatitem.message) {
              return (
                <div
                  className={
                    cssstyles.chatitem +
                    " " +
                    classes.chatitem +
                    " " +
                    classes.chatitemheader
                  }
                  key={index}
                >
                  <div>
                    <span
                      className={classes.chatdot}
                      style={{ backgroundColor: chatitem.bgcolor }}
                    />
                    {chatitem.nickname}
                    &nbsp;&nbsp;进入了聊天室
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={cssstyles.chatitem + " " + classes.chatitem}
                  key={index}
                >
                  <div>
                    <span
                      className={classes.chatdot}
                      style={{ backgroundColor: chatitem.bgcolor }}
                    />
                    <span>{chatitem.nickname}</span>
                    <span>{chatitem.messagetime}</span>
                  </div>
                  <div>{chatitem.message}</div>
                </div>
              );
            }
          })}
        </div>
        <div>
          <Input
            value={this.state.message}
            inputProps={{
              "aria-label": "说点什么...",
              placeholder: "说点什么..."
            }}
            onChange={this.handleMessage}
            onKeyUp={this.handleKeyUp}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSendmessage}
          >
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
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Chat)));
