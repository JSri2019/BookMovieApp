//Details component
import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

class Details extends Component {
  constructor() {
    super();
    // initial state
    this.state = {
      movie: { genres: [], trailer_url: "" },
      stars: [
        {
          id: 1,
          color: "black",
        },
        {
          id: 2,
          color: "black",
        },
        {
          id: 3,
          color: "black",
        },
        {
          id: 4,
          color: "black",
        },
        {
          id: 5,
          color: "black",
        },
      ],
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

  artistClickHandler = (url) => {
    // opens the given URL
    window.location = url;
  };

  starClickHandler = (id) => {
    // setting all stars till the clicked star as yellow
    let starList = [];
    for (let star of this.state.stars) {
      let starNode = star;
      if (star.id <= id) {
        starNode.color = "yellow";
      } else {
        starNode.color = "black";
      }
      starList.push(starNode);
    }
    this.setState({ stars: starList });
  };

  render() {
    let movie = this.state.movie;
    const opts = {
      height: "300",
      width: "700",
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <div className="details">
        {/* setting showBookShowButton as true for header */}
        <Header
          id={this.props.match.params.id}
          baseUrl={this.props.baseUrl}
          showBookShowButton="true"
        />
        {/* back to home link */}
        <div className="back">
          <Typography>
            <Link to="/">&#60; Back to Home</Link>
          </Typography>
        </div>
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
            <div className="trailer-margin">
              <Typography>
                <span className="bold">Trailer:</span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url.split("?v=")[1]}
                opts={opts}
                onReady={this._onReady}
              />
            </div>
          </div>

          {/* right section */}
          <div className="right-details">
            {/* Rate this movie section */}
            <Typography>
              <span className="bold">Rate this movie:</span>
            </Typography>
            {this.state.stars.map((star) => (
              <StarBorderIcon
                className={star.color}
                key={"star" + star.id}
                onClick={() => this.starClickHandler(star.id)}
              />
            ))}

            {/* Artists section */}
            <div className="bold top-margin bottom-margin">
              <Typography>
                <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div className="padding-right">
              <GridList cellHeight={160} cols={2}>
                {movie.artists != null &&
                  movie.artists.map((artist) => (
                    <GridListTile
                      className="grid-list-tile"
                      onClick={() => this.artistClickHandler(artist.wiki_url)}
                      key={artist.id}
                    >
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <GridListTileBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
