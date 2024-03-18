import { Online, Offline } from 'react-detect-offline';

import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './MovieList.css';

// eslint-disable-next-line react/prop-types
export default function MovieList({ movies, loading, error, errorText, guestSessionId, onRatingChange }) {
  // eslint-disable-next-line react/prop-types
  const moviesElements = movies.map((movie) => {
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
        {moviesElements.length === 0 && !loading ? <p>Нет фильмов по вашему запросу</p> : null}
      </Online>
      <Offline>
        <ErrorMessage messageText="Нет связи с сервером" />
      </Offline>
    </div>
  )
}