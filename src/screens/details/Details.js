//Details component
import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import Typography from "@material-ui/core/Typography";

class Details extends Component {
  constructor() {
    super();
    // initial state
    this.state = {
      movie: { genres: [] },
    };
  }

  /* Note: using componentDidMount instead of componentWillMount 
  as the latter is deprecated and is giving warnings on console when used */
  componentDidMount() {
    // getting movie information based on the movie id using backend API
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
    let movie = this.state.movie;
    return (
      <div className="details">
        <Header />
        <div className="flex-container-details">
          {/* left section */}
          <div className="left-details">
            <img src={movie.poster_url} alt={movie.title} />
          </div>

          {/* center section */}
          <div className="center-details">
            <div>
              <Typography variant="headline" component="h2">
                {movie.title}
              </Typography>
            </div>
            <div>
              <Typography>
                {/* Note: keeping the label as 'Genre' and not 'Genres' by following the screenshot */}
                <span className="bold">Genre:</span> {movie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Duration:</span> {movie.duration}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Release Date:</span>{" "}
                {new Date(movie.release_date).toDateString()}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Rating:</span> {movie.rating}
              </Typography>
            </div>
            <div className="top-margin">
              <Typography>
                <span className="bold">Plot:</span>{" "}
                <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}
              </Typography>
            </div>
          </div>

          {/* right section */}
          <div className="right-details"></div>
        </div>
      </div>
    );
  }
}

export default Details;
