import { useParams } from 'react-router';
import './components/MovieDetails/MovieDetails.scss';
import { MovieDetails } from './components/MovieDetails/MovieDetails.tsx';
import { Showtimes } from './components/Showtimes/Showtimes.tsx';
import useMovie from '../../hooks/useMovie.ts';

export const MovieShowtimesPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movie, error } = useMovie(movieId!);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <p>Movie details are not available.</p>;
  }

  return (
    <>
      <MovieDetails movie={movie}/>
      <Showtimes movieId={movie?.id}/>
    </>
  );
};
