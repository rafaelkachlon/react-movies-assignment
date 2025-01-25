import Movie from '../../../../models/movie.ts';
import './MovieDetails.scss';

interface MovieDetailsProps {
  movie: Movie | null;
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
        <p>Rating: {movie?.rating}</p>
      </div>
    </div>
  );
};
