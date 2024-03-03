# movie_app

API Key

be421c22bd5e4415008153ac9540a445

API Read Access Token

eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ

```
Authorization = Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ
```

# 1 Create Request Token

```
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
  }
};

fetch('https://api.themoviedb.org/3/authentication/token/new', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

```
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQyMWMyMmJkNWU0NDE1MDA4MTUzYWM5NTQwYTQ0NSIsInN1YiI6IjY1ZDVkYTQzNjA5NzUwMDE2MjIyZDE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRGTWMCrIyiBf7WCHqpBp9oX0rjZnywebXsA1Jas-gQ'
  }
};

fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```