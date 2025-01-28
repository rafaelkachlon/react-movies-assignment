import Movie from '../../../../models/movie.model.ts';
import './MovieList.scss';
import { Link } from 'react-router';
import { Rating } from '../../../../components/Rating/Rating.tsx';

export const MovieList = (props: { movies?: Movie[] }) => {
  if (!props.movies) return null;
  return (
    <div className="movie-list">

      {props.movies.map((movie: Movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title}/>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-genre">{movie.genre}</div>
          <div className="movie-duration">{movie.duration}</div>
          <Rating rating={movie.rating}></Rating>
        </Link>
      ))}
    </div>
  );
};
