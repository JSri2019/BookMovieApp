//Header component
import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isUserLoggedIn: false,
    };
  }

  render() {
    return (
      <header className="header">
        {/* adding logo to the header */}
        <img src={logo} className="logo" alt="Logo" />

        {/* showing login/logout button based on whether the user is logged in or not */}
        {!this.state.isUserLoggedIn ? (
          <div className="login-logout-button">
            <Button variant="contained" color="default">
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

        <div className="bookshow-button">
          <Button variant="contained" color="primary">
            Book Show
          </Button>
        </div>
      </header>
    );
  }
}

export default Header;
