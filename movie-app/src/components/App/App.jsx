import { Component } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import MoviesApiService from '../../services/movies-api';
import MovieList from '../MovieList/MovieList';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import GenresContext from '../GenresContext/GenresContext';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.moviesApi = new MoviesApiService();
    this.state = {
      query: 'Batman',
      movies: [],
      ratedMovies: [],
      genresList: [],
      currentPage: 1,
      totalPages: 5,
      totalRatedPages: 1,
      loading: true,
      error: false,
      errorText: null,
      guestSessionId: null,
      activeTab: 'Search',
    };

    this.saveGuestId = () => {
      const guestId = localStorage.getItem('guestId');


      if (guestId) {
        this.setState({ guestSessionId: guestId });
      } else {
        this.moviesApi.getGuestSessionId()
          .then((newGuestId) => {
            this.setState({ guestSessionId: newGuestId });
            localStorage.setItem('guestId', newGuestId);
          })
          .catch(this.onError);
      }
    }

    this.onQueryChange = (evt) => {
      this.setState({ query: evt.target.value });
    };
  
    this.onQueryChangeDebounced = debounce(this.onQueryChange, 800);

    this.onPageChange = (page) => {
      console.log('here')
      this.setState({currentPage: page});
    };

    this.onError = (e) => {
      this.setState({ error: true, errorText: e.message });
    };

    this.onLoaded = () => {
      this.setState({ loading: false });
    };

    this.startLoading = () => {
      this.setState({ loading: true });
    };

    this.onTabChange = (key) => {
      this.setState({ activeTab: key });
    };

    this.onRatingChange = async (value, guestSessionId, movieId) => {
      await this.moviesApi.postRating(value, guestSessionId, movieId);
      localStorage.setItem(movieId, value);
      console.log(localStorage.getItem(movieId))
      console.log(this.state.ratedMovies)
    }
  }

  componentDidMount() {
    this.saveGenres();
    console.log(this.state.genresList)
    this.saveGuestId();
    console.log(this.state.guestId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage, activeTab, guestSessionId } = this.state;
    if (guestSessionId !== prevState.guestSessionId) {
      localStorage.clear();
    }
    if (query !== prevState.query && activeTab === 'Search') {
      this.onPageChange(1);
      this.updateMovies();
    } else if (activeTab !== prevState.activeTab) {
      this.onPageChange(1);
      if (activeTab === 'Search') {
        this.updateMovies();
      } else {
        this.updateRatedMovies();
      }
    } else if (currentPage !== prevState.currentPage) {
      if (activeTab === 'Search') {
        this.updateMovies();
      } else {
        this.updateRatedMovies();
      }
    }
  }


  updateMovies() {
    this.startLoading();
    const { query, currentPage } = this.state;
    this.moviesApi.getSearchedMovies(query, currentPage)
      .then(([result, pages]) => {
        this.setState({ movies: result, totalPages: pages > 50 ? 50 : pages })
      })
      .then(this.onLoaded)
      .catch((e) => this.onError(e));
  }

  updateRatedMovies() {
    this.startLoading();
    const { guestSessionId, currentPage } = this.state;
    this.moviesApi.getRatedMovies(guestSessionId, currentPage)
      .then(([result, pages]) => {
        console.log(result)
        this.setState({ ratedMovies: result, totalPages: pages > 500 ? 500 : pages })
      })
      .catch((e) => this.onError(e));
  }

  saveGenres() {
    this.moviesApi.getGenres()
      .then((result) => this.setState({ genresList: result }))
      .catch(this.onError);
  }

  render() {
    const {
      movies,
      ratedMovies,
      loading,
      error,
      query,
      errorText,
      currentPage,
      totalPages,
      totalRatedPages,
      guestSessionId,
      genresList,
    } = this.state;

    const searchTab = {
      key: 'Search',
      label: 'Search',
      children: (
        <>
          <AppHeader onQueryChange={this.onQueryChangeDebounced} />
          <MovieList
            movies={movies}
            loading={loading}
            error={error}
            query={query}
            errorText={errorText}
            guestSessionId={guestSessionId}
            onRatingChange={this.onRatingChange}
          />
          <AppFooter currentPage={currentPage} onPageChange={this.onPageChange} totalPages={totalPages} />
        </>
      ),
    }

    const ratedTab = {
      key: 'Rated',
      label: 'Rated',
      children: (
        ratedMovies.length ?
          <>
            <MovieList
              movies={ratedMovies}
              loading={loading}
              error={error}
              query={query}
              errorText={errorText}
              guestSessionId={guestSessionId}
              onRatingChange={this.onRatingChange}
            />
            <AppFooter currentPage={currentPage} onPageChange={this.onPageChange} totalPages={totalRatedPages} />
          </>
          :
          <div>Пока нет фильмов с вашей оценкой</div>
      ),
    } 

    return (
      <GenresContext.Provider value={genresList}>
        <div className="app-wrapper">
          <Tabs
            items={ [searchTab, ratedTab] }
            size="large"
            defaultActiveKey="Search"
            onChange={this.onTabChange}
            centered
            destroyInactiveTabPane
          />
        </div>
      </GenresContext.Provider>
    );
  }
}
