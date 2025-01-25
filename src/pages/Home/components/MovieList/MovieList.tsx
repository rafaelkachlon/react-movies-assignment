import Movie from '../../../../models/movie.ts';
import './MovieList.scss';

export const MovieList = (props: { movies: Movie[] }) => {
  return (
    <div className="movie-list">
      {props.movies.map((movie: Movie) => (
        <a href={`/movies/${movie.id}`} key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title}/>
          <div className="movie-title">{movie.title} ({movie.rating} / 10)</div>
          <div className="movie-duration">{movie.duration}</div>
        </a>
      ))}
    </div>
  );
};
