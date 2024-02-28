import AppHeader from '../AppHeader';
import AppMain from '../AppMain';
import MoviesApiService from '../../services/movies-api';

const moviesApi = new MoviesApiService();

// console.log(moviesApi.fetchMovies('Batman'))

const movies = moviesApi.fetchMovies('Batman').then(results => results);

console.log(movies)

// console.log(moviesApi.getMovie('Batman').json())

// const moviesArr = await fetch()

function App() {
  return (
    <>
      <AppHeader />
      <AppMain />
    </>
  );
}

export {App};
