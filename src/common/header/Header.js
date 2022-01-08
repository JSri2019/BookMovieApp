//Header component
import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isUserLoggedIn: false,
      isModalOpen: false,
      value: 0,
      usernameRequired: "displayNone",
      username: "",
      loginPasswordRequired: "displayNone",
      loginPassword: "",
    };
  }

  // event handlers
  openModalHandler = () => {
    this.setState({
      isModalOpen: true,
      value: 0,
      usernameRequired: "displayNone",
      username: "",
      loginPasswordRequired: "displayNone",
      loginPassword: "",
    });
  };

  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "displayBlock" })
      : this.setState({ usernameRequired: "displayNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "displayBlock" })
      : this.setState({ loginPasswordRequired: "displayNone" });
  };

  usernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  loginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  render() {
    return (
      <div>
        <header className="header">
          {/* adding logo to the header */}
          <img src={logo} className="logo" alt="Logo" />

          {/* showing login/logout button based on whether the user is logged in or not */}
          {!this.state.isUserLoggedIn ? (
            <div className="login-logout-button">
              <Button
                variant="contained"
                color="default"
                onClick={this.openModalHandler}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="login-logout-button">
              <Button variant="contained" color="default">
                Logout
              </Button>
            </div>
          )}

          {/* adding book show button */}
          <div className="bookshow-button">
            <Button variant="contained" color="primary">
              Book Show
            </Button>
          </div>
        </header>

        {/* adding modal and tabs for login button functionality */}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.tabChangeHandler}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {/* when login tab is selected */}
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.usernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type="password"
                  loginpassword={this.state.loginPassword}
                  onChange={this.loginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;
