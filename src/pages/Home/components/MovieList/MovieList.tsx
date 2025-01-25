import Movie from '../../../../models/movie.ts';
import './MovieList.scss';
import StarIcon from '@mui/icons-material/Star';

export const MovieList = (props: { movies: Movie[] }) => {
  return (
    <div className="movie-list">
      {props.movies.map((movie: Movie) => (
        <a href={`/movies/${movie.id}`} key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title}/>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-duration">{movie.duration}</div>
          <div className="movie-rating">
            <StarIcon fontSize="small"/>
            <span>{movie.rating}</span>
          </div>
        </a>
      ))}
    </div>
  );
};
