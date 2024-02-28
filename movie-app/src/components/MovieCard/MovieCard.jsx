import { Card, Rate } from 'antd';

function MovieCard() {
  // const imageUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <Card hoverable className="movie-card">
      <div className='card-wraper'>
        <div className='movie-poster'>
          <img src="https://image.tmdb.org/t/p/w500/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg" alt="" />
        </div>
        <div className='movie-title'></div>
        <div className='movie-description'></div>
        <Rate disabled allowHalf value={3.5} className='movie-rating'></Rate>
      </div>
    </Card>
  );
}

export default MovieCard;