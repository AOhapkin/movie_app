export default class MoviesApiService {
  constructor() {
    this.apiBaseUrl = 'https://api.themoviedb.org/3';
    this._apiKey = 'be421c22bd5e4415008153ac9540a445';
  }

  async getResource(url) {
    const res = await fetch(`${this.apiBaseUrl}${url}`);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${this.apiBaseUrl}${url}. Status: ${res.status}`);
    }

    return res;
  }

  async getMovies(page = 1, query) {
    try {
      const res = await this.getResource(`/search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`);
      return await res.json();
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  };

  async fetchNewGuestSession() {
    const query = `${this.apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`;

    const res = await fetch(query)
      .then(data => data.json())
      .catch(e => {throw new Error(`Couldn't fetch new guest session: ${e}`);});

    return res.guest_session_id;
  }

  setSessionIdToLocalStorage(itemData) {
    try {
      localStorage.setItem('guestSessionId', JSON.stringify(itemData));
    } catch (e) {
      throw Error(e);
    }
  }

  async createNewGuestSession() {
    if (JSON.parse(localStorage.getItem('guestSessionId'))) {
      return;
    }

    const newGuestSessionId = await this.fetchNewGuestSession();
    this.setSessionIdToLocalStorage(newGuestSessionId);

    return JSON.parse(localStorage.getItem('guestSessionId'));
  }
}