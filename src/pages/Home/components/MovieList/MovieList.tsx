import Movie from '../../../../models/movie.ts';
import './MovieList.scss';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router';

export const MovieList = (props: { movies: Movie[] }) => {
  return (
    <div className="movie-list">

      {props.movies.map((movie: Movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title}/>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-genre">{movie.genre}</div>
          <div className="movie-duration">{movie.duration}</div>
          <div className="movie-rating">
            <StarIcon fontSize="small"/>
            <span>{movie.rating}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
