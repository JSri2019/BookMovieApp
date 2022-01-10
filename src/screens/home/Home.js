//Home component
import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

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
});

class Home extends Component {
  constructor() {
    super();
    // initial state
    this.state = {
      upcomingMovies: [],
    };
  }

  // getting upcoming movies from backend using componentDidMount (componentWillMount is deprecated)
  componentDidMount() {
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
  }

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

        {/* displaying grid with upcoming movies - 6 movies at a time as per requirement */}
        <GridList cols={6} className={classes.gridListUpcomingMovies}>
          {this.state.upcomingMovies.map((movie) => (
            // setting cell height of grid tile to 250 as per requirement
            <GridListTile key={movie.id} style={{ height: "250px" }}>
              <img
                src={movie.poster_url}
                className="movie-poster"
                alt={movie.title}
              />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
