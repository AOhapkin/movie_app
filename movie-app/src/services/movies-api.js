export default class MoviesApiService {
  constructor() {
    this.urlBasis = 'https://api.themoviedb.org/3/'
    this.sessionUrl = `${this.urlBasis}authentication/guest_session/new`
    this.genresUrl = `${this.urlBasis}genre/movie/list?language=en`
    this.apiKey = 'be421c22bd5e4415008153ac9540a445'

    this.requestOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
      }
    }

    this.constructUrl = (query, page) => {
      return `${this.urlBasis}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    }

    this.constructRatedUrl = (guestSessionId, page) => {
      return `${this.urlBasis}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}`
    }

    this.constructRatingUrl = (guestSessionId, movieId) => {
      return `${this.urlBasis}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`
    }

    this.getResource = async (url, options) => {
      const result = await fetch(url, options);
      if (!result.ok) {
        throw new Error(`Could not fetch ${url}. Received status ${result.status}`);
      }
      return result.json();
    }
  }

  async createGuestSession() {
    const response = await this.getResource(this.sessionUrl, this.requestOptions);
    return response.guest_session_id;
  }

  async getSearchedMovies(query, page) {
    const data = await this.getResource(this.constructUrl(query, page), this.requestOptions);
    return [data.results, data.total_pages];
  }

  async getRatedMovies(guestSessionId, page) {
    // console.log('data');
    const data = await this.getResource(this.constructRatedUrl(guestSessionId, page));
    return [data.results, data.total_pages];
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
    })
  }
}