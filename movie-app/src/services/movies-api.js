export default class MoviesApiService {
  constructor() {
    this.apiUrl = 'https://api.themoviedb.org/3/search/movie';
    this.apiOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
      }
    }
  }

  async getResource(url) {
    const res = await fetch(`${this.apiUrl}${url}`, this.apiOptions);
    if (!res.ok) {
      throw new Error(`Can't fetch ${this.apiUrl}${url}`);
    }

    return res;
  }

  async fetchMovies(movieTitle) {
    const url = `?query=${movieTitle}`;
    const response = await this.getResource(url);

    if (!response.ok) {
      throw new Error(`Can't fetch ${this.apiUrl}${url}`);
    }
    const data = await response.json();

    if (data.results.length === 0) {
      console.log(`Error: Can't find ${movieTitle}`)
    }
    // const movies = data.results;
    // console.log(data.results)
    return data.results;
  }
}