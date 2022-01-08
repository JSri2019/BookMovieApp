//Home component
import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";

class Home extends Component {
  render() {
    return (
      <div>
        {/* including header component */}
        <Header />
      </div>
    );
  }
}

export default Home;
