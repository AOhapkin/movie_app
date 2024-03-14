import { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';

import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MovieList.css';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // eslint-disable-next-line react/prop-types
    const { movies, isLoading } = this.props;
    // eslint-disable-next-line react/prop-types
    const moviesElements = movies.map((movie) => {
      return (
        <MovieCard
          key={movie.id}
          title={movie.title}
          date={movie.release_date}
          overview={movie.overview}
          poster={movie.poster_path}
          rating={movie.rating}
        />
      )
    });

    const spinner = isLoading ? <LoadingSpinner /> : null;

    return (
      <>
        <Online>
          <div className="movies-list">
            {spinner}
            {moviesElements.length === 0 && !isLoading ? 'Nothing was found for your search query. Please try to change the keywords or phrases for your search.' : moviesElements}
          </div>
        </Online>
        <Offline>
          {'Нет связи'}
        </Offline>
      </>
    )
  }
}