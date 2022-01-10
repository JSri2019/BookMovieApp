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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
      genres: [],
      genresList: [],
      artists: [],
      artistsList: [],
      releaseDateStart: "",
      releaseDateEnd: "",
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

    // getting released movies from backend
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

    // getting genres from backend
    let bodyGenres = null;
    let xhrGenres = new XMLHttpRequest();
    xhrGenres.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          genresList: JSON.parse(this.responseText).genres,
        });
      }
    });

    xhrGenres.open("GET", this.props.baseUrl + "genres");
    xhrGenres.setRequestHeader("Cache-Control", "no-cache");
    xhrGenres.send(bodyGenres);

    // getting artists from backend
    let bodyArtists = null;
    let xhrArtists = new XMLHttpRequest();
    xhrArtists.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          artistsList: JSON.parse(this.responseText).artists,
        });
      }
    });

    xhrArtists.open("GET", this.props.baseUrl + "artists");
    xhrArtists.setRequestHeader("Cache-Control", "no-cache");
    xhrArtists.send(bodyArtists);
  }

  movieNameChangeHandler = (event) => {
    this.setState({ movieName: event.target.value });
  };

  genreSelectHandler = (event) => {
    this.setState({ genres: event.target.value });
  };

  artistSelectHandler = (event) => {
    this.setState({ artists: event.target.value });
  };

  releaseDateStartHandler = (event) => {
    this.setState({ releaseDateStart: event.target.value });
  };

  releaseDateEndHandler = (event) => {
    this.setState({ releaseDateEnd: event.target.value });
  };

  filterApplyHandler = () => {
    // building query string to include all filters applied by the user
    let queryString = "?status=RELEASED";
    if (this.state.movieName !== "") {
      queryString += "&title=" + this.state.movieName;
    }
    if (this.state.genres.length > 0) {
      queryString += "&genre=" + this.state.genres.toString();
    }
    if (this.state.artists.length > 0) {
      queryString += "&artists=" + this.state.artists.toString();
    }
    if (this.state.releaseDateStart !== "") {
      queryString += "&start_date=" + this.state.releaseDateStart;
    }
    if (this.state.releaseDateEnd !== "") {
      queryString += "&end_date=" + this.state.releaseDateEnd;
    }

    // calling backend API to fetch released movies according to the filters applied
    let that = this;
    let bodyFilter = null;
    let xhrFilter = new XMLHttpRequest();
    xhrFilter.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({
          releasedMovies: JSON.parse(this.responseText).movies,
        });
      }
    });

    xhrFilter.open(
      "GET",
      this.props.baseUrl + "movies" + encodeURI(queryString)
    );
    xhrFilter.setRequestHeader("Cache-Control", "no-cache");
    xhrFilter.send(bodyFilter);
  };

  movieClickHandler = (movieId) => {
    this.props.history.push("/movie/" + movieId);
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
                  onClick={() => this.movieClickHandler(movie.id)}
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

                {/* movie name filter */}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    onChange={this.movieNameChangeHandler}
                  />
                </FormControl>

                {/* genres filter */}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="genre-multi-checkbox">Genres</InputLabel>
                  <Select
                    multiple
                    input={<Input id="genre-multi-checkbox" />}
                    renderValue={(selected) => selected.join(",")}
                    value={this.state.genres}
                    onChange={this.genreSelectHandler}
                  >
                    {this.state.genresList.map((genre) => (
                      <MenuItem key={genre.id} value={genre.genre}>
                        <Checkbox
                          checked={this.state.genres.indexOf(genre.genre) > -1}
                        />
                        <ListItemText primary={genre.genre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* artists filter */}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="artist-multi-checkbox">
                    Artists
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="artist-multi-checkbox" />}
                    renderValue={(selected) => selected.join(",")}
                    value={this.state.artists}
                    onChange={this.artistSelectHandler}
                  >
                    {this.state.artistsList.map((artist) => (
                      <MenuItem
                        key={artist.id}
                        value={artist.first_name + " " + artist.last_name}
                      >
                        <Checkbox
                          checked={
                            this.state.artists.indexOf(
                              artist.first_name + " " + artist.last_name
                            ) > -1
                          }
                        />
                        <ListItemText
                          primary={artist.first_name + " " + artist.last_name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* release date start filter */}
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateStart"
                    label="Release Date Start"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={this.releaseDateStartHandler}
                  />
                </FormControl>

                {/* release date end filter */}
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateEnd"
                    label="Release Date End"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                    onChange={this.releaseDateEndHandler}
                  />
                </FormControl>

                {/* apply filter button */}
                <br />
                <br />
                <FormControl className={classes.formControl}>
                  <Button
                    onClick={this.filterApplyHandler}
                    variant="contained"
                    color="primary"
                  >
                    APPLY
                  </Button>
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
