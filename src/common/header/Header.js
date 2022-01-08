//Header component
import React, { Component } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";

class Header extends Component {
  render() {
    return (
      <header className="header">
        {/* adding logo to the header */}
        <img src={logo} className="logo" alt="Logo" />
      </header>
    );
  }
}

export default Header;
