import Movie from '../../models/movie.model.ts';
import './MovieDetails.scss';
import { Rating } from '../Rating/Rating.tsx';

interface MovieDetailsProps {
  movie: Movie | undefined;
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  if (!movie) {
    return null;
  }
  return (
    <div className="movie-details-container">
      <div className="movie-poster">
        <img src={movie?.poster} alt={movie?.title}/>
      </div>
      <div className="movie-details">
        <h1>{movie?.title}</h1>
        <p>{movie?.description}</p>
        <p>Duration: {movie?.duration}</p>
        <Rating rating={movie.rating}></Rating>
      </div>
    </div>
  );
};
