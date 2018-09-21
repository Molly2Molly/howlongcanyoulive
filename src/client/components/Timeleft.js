import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import teal from "@material-ui/core/colors/teal";
import cssstyles from "../css/app.less";

const styles = theme => ({
  colorPrimary: {
    backgroundColor: "rgb(191, 191, 191)"
  },
  barColorPrimary: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  circleColorPrimary: {
    color: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
});

class Timeleft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      dayspercent: 0,
      hours: 0,
      hourspercent: 0,
      minutes: 0,
      minutespercent: 0,
      seconds: 0,
      secondspercent: 0
    };
  }

  componentDidMount() {
    const { userState } = this.props;
    if (userState.birthday) {
      // utc+8:00
      // const timezoneOffset = new Date().getTimezoneOffset();
      // const birthtime =
      //   moment.utc(userState.birthday) + timezoneOffset * 60 * 1000;
      const birthtime = moment(userState.birthday);
      const lasttime = moment(birthtime).add(80, "years");
      const totdaldays = 365 * 80;
      // console.log(new Date(lasttime).format("yyyy-mm-dd hh:ii:ss"));
      // console.log(
      //   moment()
      //     .utc()
      //     .format("YYYY-MM-DD hh:mm:ss")
      // );
      this.timer = setInterval(
        function() {
          let nowtime = moment();
          let left = lasttime - nowtime;
          let leftdays = Math.floor(left / (24 * 60 * 60 * 1000));
          left = Math.floor(left % (24 * 60 * 60 * 1000));
          let lefthours = Math.floor(left / (60 * 60 * 1000));
          left = Math.floor(left % (60 * 60 * 1000));
          let leftminutes = Math.floor(left / (60 * 1000));
          left = Math.floor(left % (60 * 1000));
          let leftseconds = Math.floor(left / 1000);
          this.setState({
            days: leftdays > 9 ? leftdays : "0" + leftdays,
            dayspercent: (100 * leftdays) / totdaldays,
            hours: lefthours > 9 ? lefthours : "0" + lefthours,
            hourspercent: (100 * lefthours) / 24,
            minutes: leftminutes > 9 ? leftminutes : "0" + leftminutes,
            minutespercent: (100 * leftminutes) / 60,
            seconds: leftseconds > 9 ? leftseconds : "0" + leftseconds,
            secondspercent: (100 * leftseconds) / 60
          });
        }.bind(this),
        1000
      );
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <React.Fragment>
        {userState.birthday && (
          <Paper className={cssstyles.timeleft} elevation={1}>
            <div>
              <div>
                <LinearProgress
                  variant="determinate"
                  value={this.state.dayspercent}
                  classes={{
                    colorPrimary: classes.colorPrimary,
                    barColorPrimary: classes.barColorPrimary
                  }}
                />
              </div>
              <div>
                还剩
                {this.state.days}天
              </div>
            </div>
            <div>
              <div>
                <div>
                  <CircularProgress
                    variant="static"
                    value={100}
                    style={{ color: "#ccc" }}
                  />
                  <CircularProgress
                    variant="static"
                    value={this.state.hourspercent}
                    style={{ color: "#666" }}
                  />
                </div>
                <div>
                  {this.state.hours}
                  小时
                </div>
              </div>
              <div>
                <div>
                  <CircularProgress
                    variant="static"
                    value={100}
                    style={{ color: "#ccc" }}
                  />
                  <CircularProgress
                    variant="static"
                    value={this.state.minutespercent}
                    style={{ color: "#666" }}
                  />
                </div>
                <div>
                  {this.state.minutes}
                  分钟
                </div>
              </div>
              <div>
                <div>
                  <CircularProgress
                    variant="static"
                    value={100}
                    style={{ color: "#ccc" }}
                  />
                  <CircularProgress
                    variant="static"
                    value={this.state.secondspercent}
                    style={{ color: "#666" }}
                  />
                </div>
                <div>{this.state.seconds}秒</div>
              </div>
            </div>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

Timeleft.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Timeleft));
