//Details component
import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Details.css";

class Details extends Component {
  constructor() {
    super();
    // initial state
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    // getting movie information based on the movie id
    let that = this;
    let bodyMovie = null;
    let xhrMovie = new XMLHttpRequest();
    xhrMovie.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          movie: JSON.parse(this.responseText),
        });
      }
    });

    xhrMovie.open(
      "GET",
      this.props.baseUrl + "movies/" + this.props.match.params.id
    );
    xhrMovie.setRequestHeader("Cache-Control", "no-cache");
    xhrMovie.send(bodyMovie);
  }

  render() {
    return (
      <div className="details">
        <Header />
        <div className="flex-container-details">
          <div className="left-details"></div>
          <div className="center-details"></div>
          <div className="right-details"></div>
        </div>
      </div>
    );
  }
}

export default Details;
