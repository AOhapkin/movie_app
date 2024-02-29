import AppHeader from '../AppHeader';
import AppMain from '../AppMain';
import MoviesApiService from '../../services/movies-api';
import MovieCard from '../MovieCard/MovieCard';

const moviesApi = new MoviesApiService();

// console.log(moviesApi.fetchMovies('Batman'))

moviesApi.createNewGuestSession();
const movies = moviesApi.getMovies('Batman');

console.log(movies)

// console.log(moviesApi.getMovie('Batman').json())

// const moviesArr = await fetch()

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
