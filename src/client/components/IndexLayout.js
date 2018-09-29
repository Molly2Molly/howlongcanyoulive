import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import cssstyles from "../css/app.less";
import Header from "./Header";
import Footer from "./Footer";
import Timeleft from "./Timeleft";

const styles = {
  root: {},
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  login: {
    textTransform: "none"
  }
};

class IndexLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handelLoginClick = this.handelLoginClick.bind(this);
  }

  handelLoginClick() {
    this.props.dispatch(openLoginDialog());
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className={cssstyles.centerContainer}>
          <div>
            {userState.birthday && (
              <Route
                exact
                path="/"
                render={props => {
                  return <Timeleft />;
                }}
              />
            )}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { userState } = state;
  return { userState };
}

IndexLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(IndexLayout));
