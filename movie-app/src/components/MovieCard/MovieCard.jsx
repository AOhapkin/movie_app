import { Component } from 'react';
import { parseISO, format } from 'date-fns';
import { Rate } from 'antd';

import NoImage from './noPoster.png';
import './MovieCard.css';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.maxOverviewLength = 180;
    this.posterUrl = 'https://image.tmdb.org/t/p/w500';

    this.setRating = (value) => {
      console.log(value);
    }
  }

  trimOverview(text) {
    if (text.length > this.maxOverviewLength) {
      const indexOfLastSpace = text.lastIndexOf(' ', this.maxOverviewLength);
      const trimmedText = text.slice(0, indexOfLastSpace);
      return trimmedText + '...';
    }
    return text;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {title, date, overview, poster, rating} = this.props;
    let formattedMovieDate = '';
    if (date) {
      formattedMovieDate = format(parseISO(date), 'MMMM d, y');
    }
    const trimmedOverview = this.trimOverview(overview);
    return (
      <div className="card">
        <div className="card__image">
          <img src={poster ? this.posterUrl + poster : NoImage} />
        </div>
        <div className="card__description">
          <h3 className='card__title'>{title}</h3>
          <p className='card__date'>{formattedMovieDate}</p>
          <ul className="genres-list">
            <li className="genres-list__item">Action</li>
            <li className="genres-list__item">Drama</li>
            <li className="genres-list__item">Drama2</li>
            <li className="genres-list__item">Drama2f43wg</li>
            <li className="genres-list__item">Drama2f43wg435234</li>
          </ul>
          <div className="card__overview">
            <p className='overview-text'>{trimmedOverview}</p>
            <Rate
              allowHalf
              className="card__rating-stars"
              count={10}
              allowClear={false}
              value={rating}
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