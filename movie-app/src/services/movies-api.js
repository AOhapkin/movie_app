export default class MoviesApiService {
  constructor() {
    this.urlBasis = new URL('https://api.themoviedb.org/'),
    this.guestSessionUrlEnding = '3/authentication/guest_session/new';
    this.apiKey = 'be421c22bd5e4415008153ac9540a445',

    this.requestOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
      }
    }

//     this.constructUrl = (query, page) => {
//       return `${this.urlBasis}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
//     }

//     this.constructRatedUrl = (guestSessionId, page) => {
//       return `${this.urlBasis}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}`
//     }

//     this.constructRatingUrl = (guestSessionId, movieId) => {
//       return `${this.urlBasis}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`
//     }

//     this.getResource = async (url, options) => {
//       const result = await fetch(url, options);
//       if (!result.ok) {
//         throw new Error(`Could not fetch ${url}. Received status ${result.status}`);
//       }
//       return result.json();
//     }
  }

//   async createGuestSession() {
//     const response = await this.getResource(this.sessionUrl, this.requestOptions);
//     return response.guest_session_id;
//   }

  async getGuestSessionId() {
    const url = new URL(this.guestSessionUrlEnding, this.urlBasis);
    url.searchParams.set('api_key', this.apiKey);

    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to get guest session');
      };
      const resultJson = await result.json();
      return await resultJson.guest_session_id;
    } catch (e) {
      throw new Error('Failed to get guest session', e.message);
    }
  }

  async getSession(guestSessionId, page) {
    const url = new URL(
      `3/guest_session/${guestSessionId}/rated/movies`,
      this.urlBasis,
    );
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('page', page);

    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to get session');
      }
      const session = result.json();
      return await session;
    } catch (e) {
      throw new Error('Failed to get session'. e.message);
    }
  }

  async getAllMovies(query) {
    const url = new URL('3/search/movie', this.urlBasis);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('query', query);

    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to fetch all movies');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Failed to fetch all movies', e.message);
    }
  }

//   async getSearchedMovies(query, page) {
//     try {
//       const data = await this.getResource(this.constructUrl(query, page), this.requestOptions);
//       return [data.results, data.total_pages];
//     } catch (e) {
//       console.error(e.message)
//     }
//   }

  async getSearchedMoviesByPage(query, page) {
    const url = new URL('3/search/movie', this.urlBasis);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('query', query);
    url.searchParams.set('page', page);

    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to fetch movies by page');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Failed to fetch movies by page', e.message);
    }
  }

//   async getRatedMovies(guestSessionId, page) {
//     try {
//       const data = await this.getResource(this.constructRatedUrl(guestSessionId, page));
//       return [data.results, data.total_pages];
//     } catch (e) {
//       console.error(e.message)
//     }
//   }

//   async getGenres() {
//     const data = await this.getResource(this.genresUrl, this.requestOptions);
//     return data.genres;
//   }

  async getGenres() {
    const url = new URL('3/genre/movie/list', this.urlBasis);
    url.searchParams.set('language', 'en');
    url.searchParams.set('api_key', this.apiKey);

    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to fetch genres');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Failed to fetch genres', e.message);
    }
  }

//   async postRating(valueMark, guestSessionId, movieId) {
//     return this.getResource(this.constructRatingUrl(guestSessionId, movieId), {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({ value: valueMark }),
//     })
//   }

  async postRating(value, guestSessionId, movieId) {
    const url = new URL(`3/movie/${movieId}/rating`, this.urlBasis);
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('guest_session_id', guestSessionId);

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ value: value }),
      });

      if (!result.ok) {
        throw new Error(`Failed to post rating. Movie ID : ${movieId}`);
      }
      return result;
    } catch (e) {
      throw new Error(`Failed to post rating. Movie ID : ${movieId}`, e.message);
    }
  }
}