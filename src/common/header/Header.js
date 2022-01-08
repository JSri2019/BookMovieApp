//Header component
import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isUserLoggedIn: false,
      isModalOpen: false,
      value: 0,
    };
  }

  openModalHandler = () => {
    this.setState({ isModalOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
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
          <Tabs value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default Header;
