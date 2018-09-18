import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import cssstyles from "../css/app.less";

const styles = theme => {
  root: {
  }
};

class Timeleft extends React.Component {
  constructor(props) {
    super(props);
    this.state = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  componentDidMount() {
    const { userState } = this.props;
    if (userState.birthday) {
      const birthday = new Date(userState.birthday.replace(/-/, "/")).getTime();
      const lastday = birthday + 80 * 365 * 24 * 60 * 60 * 1000;
      this.timer = setInterval(
        function() {
          let now = new Date().getTime();
          let left = lastday - now;
          let leftdays = Math.floor(left / (24 * 60 * 60 * 1000));
          left = Math.floor(left % (24 * 60 * 60 * 1000));
          let lefthours = Math.floor(left / (60 * 60 * 1000));
          left = Math.floor(left % (60 * 60 * 1000));
          let leftminutes = Math.floor(left / (60 * 1000));
          left = Math.floor(left % (60 * 1000));
          let leftseconds = Math.floor(left / 1000);
          this.setState({
            days: leftdays > 9 ? leftdays : "0" + leftdays,
            hours: lefthours > 9 ? lefthours : "0" + lefthours,
            minutes: leftminutes > 9 ? leftminutes : "0" + leftminutes,
            seconds: leftseconds > 9 ? leftseconds : "0" + leftseconds
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
              <span>{this.state.days}</span>天
            </div>
            <div>
              {this.state.hours}:{this.state.minutes}:{this.state.seconds}
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
