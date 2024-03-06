import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesApiService from '../../services/movies-api';
import AppHeader from '../AppHeader';
import MovieList from '../MovieList/MovieList';
import AppFooter from '../AppFooter/AppFooter'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.moviesApi = new MoviesApiService();
    this.state = {
      query: 'Batman',
      movies: [],
      currentPage: 1,
      totalPages: 10,
      isLoading: true
    };

    this.onPageChange = (page) => {
      this.setState({currentPage: page});
    };
  }

  onQueryChange() {
    debounce((evt) => {
      console.log(evt.target.value);
      this.setState({ query: evt.target.value })
    }, 800);
  }

  updateMovies() {
    // this.initLoading();
    const {query, currentPage} = this.state;
    this.moviesApi
      .getSearchedMovies(query, currentPage)
      .then(([movies, totalPages]) => {
        this.setState({movies: movies, totalPages: totalPages})
      })
      .then(this.onLoaded)
      .catch(console.log('e'));
  }

  componentDidMount() {
    this.updateMovies()
    // console.log(this.state.movies)
  }

  componentDidUpdate(prevProps, prevState) {
    const {query, currentPage} = this.state;

    if (query !== prevState.query) {
      this.onPageChange(1);
      this.updateMovies();
    } else if (currentPage !== prevState.currentPage) {
      this.updateMovies()
    }
  }

  // onLoaded = () => {
  //   this.setState({ isLoading: false })
  // }

  // initLoading = () => {
  //   this.setState({ isLoading: true })
  // }

  render() {
    // this.moviesApi.getSearchedMovies('Batman', 1).then(([movies, totalPages]) => {
    //   console.log(movies);
    //   console.log(totalPages);
    // });
    const {movies, currentPage, totalPages} = this.state;

    console.log(movies)

    return (
      <>
        <AppHeader onQueryChange={this.onQueryChange.bind(this)} />
        <MovieList movies={movies} />
        <AppFooter currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange} />
      </>
    );
  }
}
