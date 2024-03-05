import MovieCard from '../MovieCard/MovieCard';

function MovieList({movies}){
  const movieCards = movies.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        genres={movie.genre_ids}
        title={movie.title}
        release_date={movie.release_date}
        overview={movie.overview}
        poster={movie.poster_path}
      />
    );
  });
}
