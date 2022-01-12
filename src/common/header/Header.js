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
import { Link } from "react-router-dom";

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
    //initial state
    this.state = {
      isUserLoggedIn:
        sessionStorage.getItem("access-token") == null ? false : true,
      isModalOpen: false,
      value: 0,
      usernameRequired: "displayNone",
      username: "",
      loginPasswordRequired: "displayNone",
      loginPassword: "",
      firstNameRequired: "displayNone",
      firstName: "",
      lastNameRequired: "displayNone",
      lastName: "",
      emailRequired: "displayNone",
      email: "",
      registerPasswordRequired: "displayNone",
      registerPassword: "",
      contactNoRequired: "displayNone",
      contactNo: "",
      registrationSuccess: false,
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
      firstNameRequired: "displayNone",
      firstName: "",
      lastNameRequired: "displayNone",
      lastName: "",
      emailRequired: "displayNone",
      email: "",
      registerPasswordRequired: "displayNone",
      registerPassword: "",
      contactNoRequired: "displayNone",
      contactNo: "",
      registrationSuccess: false,
    });
  };

  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value, registrationSuccess: false });
  };

  loginClickHandler = () => {
    // field validations
    this.state.username === ""
      ? this.setState({ usernameRequired: "displayBlock" })
      : this.setState({ usernameRequired: "displayNone" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "displayBlock" })
      : this.setState({ loginPasswordRequired: "displayNone" });

    //if all fields are present then only do the login
    if (this.state.username !== "" && this.state.loginPassword !== "") {
      // calling backend API for login
      let body = null;
      let xhrLogin = new XMLHttpRequest();
      let that = this;
      xhrLogin.addEventListener("readystatechange", function () {
        // set values in sessionStorage and state only when login is successful (status code 200)
        if (this.readyState === 4 && this.status === 200) {
          sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
          sessionStorage.setItem(
            "access-token",
            xhrLogin.getResponseHeader("access-token")
          );

          that.setState({
            isUserLoggedIn: true,
          });

          that.closeModalHandler();
        }
      });

      xhrLogin.open("POST", this.props.baseUrl + "auth/login");
      xhrLogin.setRequestHeader(
        "Authorization",
        "Basic " +
          window.btoa(this.state.username + ":" + this.state.loginPassword)
      );
      xhrLogin.setRequestHeader("Content-Type", "application/json");
      xhrLogin.setRequestHeader("Cache-Control", "no-cache");
      xhrLogin.send(body);
    }
  };

  usernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  loginPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  registerClickHandler = () => {
    // field validations
    this.state.firstName === ""
      ? this.setState({ firstNameRequired: "displayBlock" })
      : this.setState({ firstNameRequired: "displayNone" });
    this.state.lastName === ""
      ? this.setState({ lastNameRequired: "displayBlock" })
      : this.setState({ lastNameRequired: "displayNone" });
    this.state.email === ""
      ? this.setState({ emailRequired: "displayBlock" })
      : this.setState({ emailRequired: "displayNone" });
    this.state.registerPassword === ""
      ? this.setState({ registerPasswordRequired: "displayBlock" })
      : this.setState({ registerPasswordRequired: "displayNone" });
    this.state.contactNo === ""
      ? this.setState({ contactNoRequired: "displayBlock" })
      : this.setState({ contactNoRequired: "displayNone" });

    //if all fields are present then only do the registration
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.email !== "" &&
      this.state.registerPassword !== "" &&
      this.state.contactNo !== ""
    ) {
      //calling API to register a user and updating registrationSuccess as true
      let body = JSON.stringify({
        email_address: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        mobile_number: this.state.contactNo,
        password: this.state.registerPassword,
      });

      let xhrRegister = new XMLHttpRequest();
      let that = this;
      xhrRegister.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          that.setState({
            registrationSuccess: true,
          });
        }
      });

      xhrRegister.open("POST", this.props.baseUrl + "signup");
      xhrRegister.setRequestHeader("Content-Type", "application/json");
      xhrRegister.setRequestHeader("Cache-Control", "no-cache");
      xhrRegister.send(body);
    }
  };

  firstNameChangeHandler = (e) => {
    this.setState({ firstName: e.target.value });
  };

  lastNameChangeHandler = (e) => {
    this.setState({ lastName: e.target.value });
  };

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  registerPasswordChangeHandler = (e) => {
    this.setState({ registerPassword: e.target.value });
  };

  contactNoChangeHandler = (e) => {
    this.setState({ contactNo: e.target.value });
  };

  logoutClickHandler = (e) => {
    // clearing session storage on clicking logout button
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    this.setState({
      isUserLoggedIn: false,
    });
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
              <Button
                variant="contained"
                color="default"
                onClick={this.logoutClickHandler}
              >
                Logout
              </Button>
            </div>
          )}

          {/* adding book show button and 
           showing book show button only when showBookShowButton is true and
           opening login/register modal when user is not logged in and 
           opening book show page when the user is logged in */}
          {this.props.showBookShowButton === "true" &&
          !this.state.isUserLoggedIn ? (
            <div className="bookshow-button">
              <Button
                variant="contained"
                color="primary"
                onClick={this.openModalHandler}
              >
                Book Show
              </Button>
            </div>
          ) : (
            ""
          )}

          {this.props.showBookShowButton === "true" &&
          this.state.isUserLoggedIn ? (
            <div className="bookshow-button">
              <Link to={"/bookshow/" + this.props.id}>
                <Button variant="contained" color="primary">
                  Book Show
                </Button>
              </Link>
            </div>
          ) : (
            ""
          )}
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
              {/* showing message when login is successful */}
              {this.state.isUserLoggedIn === true && (
                <FormControl>
                  <span>Login Successful!</span>
                </FormControl>
              )}
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

          {/* when register tab is selected */}
          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  type="text"
                  firstname={this.state.firstName}
                  onChange={this.firstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstNameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  type="text"
                  lastname={this.state.lastName}
                  onChange={this.lastNameChangeHandler}
                />
                <FormHelperText className={this.state.lastNameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  email={this.state.email}
                  onChange={this.emailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                <Input
                  id="registerPassword"
                  type="password"
                  registerpassword={this.state.registerPassword}
                  onChange={this.registerPasswordChangeHandler}
                />
                <FormHelperText className={this.state.registerPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
                <Input
                  id="contactNo"
                  type="text"
                  contactno={this.state.contactNo}
                  onChange={this.contactNoChangeHandler}
                />
                <FormHelperText className={this.state.contactNoRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              {/* showing message when registration is successful */}
              {this.state.registrationSuccess === true && (
                <FormControl>
                  <span>Registration Successful. Please Login!</span>
                </FormControl>
              )}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.registerClickHandler}
              >
                REGISTER
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;
