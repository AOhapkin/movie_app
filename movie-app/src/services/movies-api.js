export default class MoviesApiService {
  constructor() {
    this.apiBaseUrl = 'https://api.themoviedb.org/3';
    this.sessionUrl = `${this.urlBasis}authentication/guest_session/new`;
    this.genresUrl = `${this.urlBasis}genre/movie/list?language=en`;
    this._apiKey = 'be421c22bd5e4415008153ac9540a445';
    this._auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ';

    this.requestOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
      }
    }
  }

  createMovieSearchUrl(query, page) {
    return `${this.apiBaseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  }

  async getResource(url) {
    const result = await fetch(url, this.requestOptions);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}. Received status ${result.status}`);
    }
    return result.json();
  }

  async getSearchedMovies(query, page) {
    const data = await this.getResource(this.createMovieSearchUrl(query, page));
    return [data.results, data.total_pages];
  }

  async createGuestSession() {
    const response = await this.getResource(this.sessionUrl, this.requestOptions);
    return response.guest_session_id;
  }

  async getGenres() {
    const data = await this.getResource(this.genresUrl, this.requestOptions);
    return data.genres;
  }

  async postRating(valueMark, guestSessionId, movieId) {
    return this.getResource(this.constructRatingUrl(guestSessionId, movieId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: valueMark }),
    });
  }

  async getRatedMovies(guestSessionId, page) {
    const data = await this.getResource(this.constructRatedUrl(guestSessionId, page));
    return [data.results, data.total_pages];
  }
}