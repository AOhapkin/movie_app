import { Component } from 'react';
import { debounce, result } from 'lodash';
import { Tabs } from 'antd';

import MoviesApiService from '../../services/movies-api';
import MovieList from '../MovieList/MovieList';
import RatedMovieList from '../RatedMovieList/RatedMovieList';
import AppHeader from '../AppHeader/AppHeader';
import GenresContext from '../GenresContext/GenresContext';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.moviesApi = new MoviesApiService();
    this.state = {
      query: '',
      movies: [],
      ratedMovies: [],
      ratedMoviesNumber: 0,
      genresList: [],
      currentPage: 1,
      totalPages: 1,
      totalRatedPages: 1,
      loading: false,
      error: false,
      errorText: null,
      guestSessionId: null,
      activeTab: 'Search',
      hasRated: false,
      isFirstInit: true
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
      const newQuery = evt.target.value.trim();

      if (newQuery === '') {
        this.setState({query: ''})
        return;
      }

      this.setState({ isLoading: true });

      this.moviesApi
        .getAllMovies(newQuery)
        .then((resp) => {
          this.setState({ 
            query: newQuery,
            movies: resp.results,
            totalPages: resp.total_pages,
            loading: false,
            isFirstInit: false
          });
        })
        .catch((e) => {
          this.setState({ loading: false });
          this.onError(e);
        });
    };
  
    this.onQueryChangeDebounced = debounce(this.onQueryChange, 800);

    this.onPageChange = (page) => {
      this.setState({
        loading: true
      });
      this.moviesApi
        .getSearchedMoviesByPage(this.state.query, page)
        .then((resp) => {
          this.setState({
            movies: resp.results,
            currentPage: resp.page,
            loading: false
          })
        })
        .catch((e) => {
          this.setState({loading: false});
          this.onError(e);
        })
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
      this.setState({
        hasRated: true
      })
    }

    this.getRated = () => {
      return this.moviesApi.getRatedSession(this.state.guestSessionId, 1);
    }

    this.getRatedPage = (page) => {
      return this.moviesApi.getRatedSession(this.state.guestSessionId, page);
    }
  }

  componentDidMount() {
    this.saveGenres();
    this.saveGuestId();
  }

  saveGenres() {
    this.moviesApi.getGenres()
      .then((result) => this.setState({ genresList: result }))
      .catch(this.onError);
  }

  render() {
    const {
      movies,
      loading,
      error,
      query,
      errorText,
      currentPage,
      totalPages,
      totalRatedPages,
      guestSessionId,
      genresList,
      activeTab,
      hasRated,
      isFirstInit
    } = this.state;

    const searchTab = {
      key: 'Search',
      label: 'Search'
    }

    const ratedTab = {
      key: 'Rated',
      label: 'Rated'
    }

    const currentTab = (tab) => {
      if (tab === 'Search') {
        return (
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
              isFirstInit={isFirstInit}
              currentPage={currentPage}
              onPageChange={this.onPageChange}
              totalPages={totalPages}
            />
          </>
        );
      } else if (tab === 'Rated') {
        return (
          <>
            <RatedMovieList
              loading={loading}
              error={error}
              errorText={errorText}
              getRated={this.getRated}
              getRatedPage={this.getRatedPage}
              onRatingChange={this.onRatingChange}
              guestSessionId={guestSessionId}
              hasRated={hasRated}
            />
          </>
        )
      }
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
          {currentTab(activeTab)}
        </div>
      </GenresContext.Provider>
    );
  }
}
