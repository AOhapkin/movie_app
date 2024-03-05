import { Component } from 'react';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // eslint-disable-next-line react/prop-types
    const { movies } = this.props;
    // eslint-disable-next-line react/prop-types
    const moviesElements = movies.map((movie) => {
      return (
        <MovieCard
          key={movie.id}
          title={movie.title}
          date={movie.release_date}
          overview={movie.overview}
          poster={movie.poster_path}
        />
      )
    });

    return (
      <div className="movies-list">
        {moviesElements}
      </div>
    )
  }
}