import { Component } from 'react';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.maxOverviewLength = 240;
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
    const {title, date, overview, poster} = this.props;
    
  }
}