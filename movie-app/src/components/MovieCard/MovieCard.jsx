import { Component } from 'react';
import { parseISO, format } from 'date-fns';
import { Rate } from 'antd';

import GenresContext from '../GenresContext/GenresContext';

import NoImage from './noPoster.png';
import './MovieCard.css';

export default class MovieCard extends Component {
  constructor(props) {
    super(props)

    this.maxOverviewLength = 160;
    this.maxMovieTitleLength = 20;
    this.state = {
      stateRating: null,
    }

    this.trimOverview = (text) => {
      if (text.length > this.maxOverviewLength) {
        const indexOfLastSpace = text.lastIndexOf(' ', this.maxOverviewLength);
        const trimmedText = text.slice(0, indexOfLastSpace);
        return trimmedText + '...';
      }
      return text;
    }

    this.trimMovieTitle = (text) => {
      if (text.length > this.maxMovieTitleLength) {
        const trimmedTitle = text.slice(0, this.maxMovieTitleLength);
        return trimmedTitle + '...';
      }
      return text;
    }

    this.getRelatedGenres = (allGenres, neededGenres) => {
      return allGenres.genres.filter((elem) => {
        return neededGenres.includes(elem.id);
      });
    }

    this.setRating = (ratingValue) => {
      const { guestSessionId, movieId, onRatingChange } = this.props;
      onRatingChange(ratingValue, guestSessionId, movieId);
      this.setState(() => {
        return { stateRating: ratingValue };
      });
    }
  }

  render() {
    const { title, date, overview, posterEndpoint, globalRating, genres, rating } = this.props;
    const { stateRating } = this.state;
    const allGenres = this.context;
    const posterPath = 'https://image.tmdb.org/t/p/w500';
    const formattedDate = date === '' || undefined ? '' : format(parseISO(date), 'MMMM d, y');
    
    let ratingClassnames = 'card__rating';
    if (globalRating < 3) {
      ratingClassnames += ' card__rating--red'
    } else if (globalRating < 5) {
      ratingClassnames += ' card__rating--orange'
    } else if (globalRating < 7) {
      ratingClassnames += ' card__rating--yellow'
    } else if (globalRating >= 7) {
      ratingClassnames += ' card__rating--green'
    } else {
      ratingClassnames += ' card__rating--no-rating'
    }

    const genresList = this.getRelatedGenres(allGenres, genres);

    const genresElements = genresList.map((genre) => {
      return (
        <li key={genre.id} className="card__genre">
          {genre.name}
        </li>
      )
    })

    return (
      <div className="card">
        <div className="card__image-block">
          <img
            className="card__image"
            alt="Film Poster"
            src={posterEndpoint ? posterPath + posterEndpoint : NoImage}
          />
        </div>
        <div className="card__information">
          <div className={ratingClassnames}>{globalRating.toFixed(1)}</div>
          <h3 className="card__header"> {this.trimMovieTitle(title)}</h3>
          <span className="card__date">{formattedDate}</span>
          <ul className="card__genres">{genresElements}</ul>
          <div className="card__text-and-rate">
            <p className="card__description">{this.trimOverview(overview)}</p>
            <Rate
              allowHalf
              className="card__stars"
              count={10}
              allowClear={false}
              value={stateRating || rating}
              style={{
                fontSize: 15,
              }}
              defaultValue={0}
              onChange={this.setRating}
            />
          </div>
        </div>
      </div>
    )
  }
}

MovieCard.contextType = GenresContext;