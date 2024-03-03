import AppHeader from '../AppHeader';
import AppMain from '../AppMain';
import MoviesApiService from '../../services/movies-api';
import MovieCard from '../MovieCard/MovieCard';

const moviesApi = new MoviesApiService();

// moviesApi.createNewGuestSession() 

// это работает
// const promise = moviesApi.getMovies();
// promise.then(response => response)

console.log(moviesApi.getSearchedMovies('Batman', 1));

function App() {
  return (
    <>
      <AppHeader />
      <AppMain />
      <MovieCard />
    </>
  );
}

export {App};
