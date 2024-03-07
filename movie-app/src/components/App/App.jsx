import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesApiService from '../../services/movies-api';
import AppHeader from '../AppHeader';
import MovieList from '../MovieList/MovieList';
import AppFooter from '../AppFooter/AppFooter';
import './App.css'

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
    
    this.onQueryChange = (evt) => {
      this.setState({ query: evt.target.value })
    }
  
    this.onQueryChangeDebounced = debounce(this.onQueryChange, 800)
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

  onPageChange(page) {
    this.setState({currentPage: page});
  };

  render() {
    const {movies, currentPage, totalPages} = this.state;

    console.log(movies)

    return (
      <div className='app-wrapper'>
        <AppHeader onQueryChange={this.onQueryChangeDebounced} />
        <MovieList movies={movies} />
        <AppFooter currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange.bind(this)} />
      </div>
    );
  }
}
