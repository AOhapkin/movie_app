export default class MoviesApiService {
  constructor() {
    this.apiBaseUrl = 'https://api.themoviedb.org/3';
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
    return `${this.apiBaseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
  }

  async getResource(url) {
    const result = await fetch(url, this.requestOptions)
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}. Received status ${result.status}`)
    }
    return result.json()
  }

  async getSearchedMovies(query, page) {
    const data = await this.getResource(this.createMovieSearchUrl(query, page))
    return [data.results, data.total_pages]
  }


  // async fetchNewGuestSession() {
  //   const query = `${this.apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`;

  //   const res = await fetch(query)
  //     .then(data => data.json())
  //     .catch(e => {throw new Error(`Couldn't fetch new guest session: ${e}`);});

  //   return res.guest_session_id;
  // }

  // setSessionIdToLocalStorage(itemData) {
  //   try {
  //     localStorage.setItem('guestSessionId', JSON.stringify(itemData));
  //   } catch (e) {
  //     throw Error(e);
  //   }
  // }

  // async createNewGuestSession() {
  //   if (JSON.parse(localStorage.getItem('guestSessionId'))) {
  //     return;
  //   }

  //   // const newGuestSessionId = await this.fetchNewGuestSession();
  //   // this.setSessionIdToLocalStorage(newGuestSessionId);

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
  //     }
  //   };
    
  //   fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));

  //   //

  //   return JSON.parse(localStorage.getItem('guestSessionId'));
  // }
}