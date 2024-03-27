import { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';

import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import '../MovieList/MovieList.css';

export default class RatedMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratedMovies: [],
      ratedMoviesNumber: 0,
      page: 0,
      totalPages: 0,
    }

    this.getRated = () => {
      if (this.props.hasRated) {
        this.props
          .getRated()
          .then(res => {
            this.setState({
              ratedMovies: res.results,
              ratedMoviesNumber: res.total_results,
              page: res.page,
              totalPages: res.total_pages
            });
          })
          .catch(e => {
            console.log('getRated error')
            this.props.onError(e);
          });
      }
    }

    this.getRatedPage = (page) => {
      this.props
        .getRatedPage(page)
        .then(res => {
          this.setState({
            ratedMovies: res.results,
            ratedMoviesNumber: res.total_results,
            page: res.page,
            totalPages: res.total_pages
          });
        })
        .catch(e => this.props.onError(e));
    }
  }

  componentDidMount() {
    console.log('Rated did mount')
    this.getRated();
  }

  render() {
    const { ratedMovies, onRatingChange, guestSessionId, loading, error, errorText } = this.state;
    const moviesElements = ratedMovies.map((movie) => {
      return (
        <MovieCard
          globalRating={movie.vote_average}
          key={movie.id}
          movieId={movie.id}
          genres={movie.genre_ids}
          title={movie.title}
          date={movie.release_date}
          overview={movie.overview}
          posterEndpoint={movie.poster_path}
          guestSessionId={guestSessionId}
          onRatingChange={onRatingChange}
          rating={movie.rating || Number(localStorage.getItem(movie.id)) || 0}
        />
      )
    });

    const content = !loading && !error ? moviesElements : null;

    return (
      <div className="movies-list">
        <Online>
          {loading && !error ? <LoadingSpinner /> : null}
          {error ? <ErrorMessage messageText={errorText} /> : null}
          {content}
          {moviesElements.length === 0 && !loading ? <p>Пока нет фильмов с оценками</p> : null}
        </Online>
        <Offline>
          <ErrorMessage messageText="Нет связи с сервером" />
        </Offline>
      </div>
    )
  }
}