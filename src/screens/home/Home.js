//Home component
import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListReleasedMovies: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  formTitle: {
    color: theme.palette.primary.light,
  },
});

class Home extends Component {
  constructor() {
    super();
    // initial state
    this.state = {
      upcomingMovies: [],
      releasedMovies: [],
      movieName: "",
    };
  }

  // getting upcoming and released movies from backend using componentDidMount (componentWillMount is deprecated)
  componentDidMount() {
    // getting upcoming movies from backend
    let body = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          upcomingMovies: JSON.parse(this.responseText).movies,
        });
      }
    });

    xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(body);

    //getting released movies from backend
    let bodyReleased = null;
    let xhrReleased = new XMLHttpRequest();
    xhrReleased.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          releasedMovies: JSON.parse(this.responseText).movies,
        });
      }
    });

    xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
    xhrReleased.setRequestHeader("Cache-Control", "no-cache");
    xhrReleased.send(bodyReleased);
  }

  movieNameChangeHandler = (event) => {
    this.setState({ movieName: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* including header component */}
        <Header baseUrl={this.props.baseUrl} />

        {/* displaying upcoming movies heading */}
        <div className="upcoming-movies-heading">
          <span>Upcoming Movies</span>
        </div>

        {/* displaying grid with upcoming movies -
         displaying 6 movies at a time and setting cell height of grid tile to 250 as per requirement */}
        <GridList
          cellHeight={250}
          cols={6}
          className={classes.gridListUpcomingMovies}
        >
          {this.state.upcomingMovies.map((movie) => (
            <GridListTile key={"upcoming" + movie.id}>
              <img
                src={movie.poster_url}
                className="movie-poster"
                alt={movie.title}
              />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>

        {/* displaying grid with released movies - 
         displaying 4 movies at a time and setting cell height of grid tile to 350 as per requirement */}
        <div className="flex-container">
          <div className="left">
            <GridList
              cellHeight={350}
              cols={4}
              className={classes.gridListReleasedMovies}
            >
              {this.state.releasedMovies.map((movie) => (
                <GridListTile
                  className="released-movie-grid-item"
                  key={"released" + movie.id}
                >
                  <img
                    src={movie.poster_url}
                    className="movie-poster"
                    alt={movie.title}
                  />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:{" "}
                        {new Date(movie.release_date).toDateString()}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          {/* filter section */}
          <div className="right">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.formTitle}>
                    FIND MOVIES BY:
                  </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    onChange={this.movieNameChangeHandler}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
