import { Online, Offline } from 'react-detect-offline';

import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AppFooter from '../AppFooter/AppFooter';
import './MovieList.css';

export default function MovieList({ 
  movies,
  loading,
  error, 
  errorText,
  guestSessionId,
  onRatingChange,
  isFirstInit,
  currentPage,
  onPageChange,
  totalPages 
}) {
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

  const pagination = (pages) => {
    if (pages > 1) {
      return <AppFooter currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
    }
    return null;
  }

  return (
    <div className="movies-list">
      <Online>
        {loading && !error ? <LoadingSpinner /> : null}
        {error ? <ErrorMessage messageText={errorText} /> : null}
        {content}
        {moviesElements.length === 0 && !loading && !isFirstInit ? <p>Нет фильмов по вашему запросу</p> : null}
        {pagination(totalPages)}
      </Online>
      <Offline>
        <ErrorMessage messageText="Нет связи с сервером" />
      </Offline>
    </div>
  )
}