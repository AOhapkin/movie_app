import { Component } from 'react';
import { parseISO, format } from 'date-fns';
import { Typography } from 'antd';

import NoImage from './test_img.jpg';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.maxOverviewLength = 240;
    this.posterUrl = 'https://image.tmdb.org/t/p/w500';
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
    const {title, date, overview, poster} = this.props;
    const { Title } = Typography;
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
        <div className="card_description">
          <Title className='card__title' level={3}>{title}</Title>
          <p className='card__date'>{formattedMovieDate}</p>
          <ul className="genres-list">
            <li className="genres-list__item">Action</li>
            <li className="genres-list__item">Drama</li>
          </ul>
          <p className='card__overview'>{trimmedOverview}</p>
        </div>
      </div>
    )
  }
}