import { useParams } from 'react-router';
import '../../components/MovieDetails/MovieDetails.scss';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails.tsx';
import { Showtimes } from './components/Showtimes/Showtimes.tsx';
import useMovies from '../../hooks/useMovies.ts';

export const MovieShowtimesPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movies } = useMovies();
  const movie = movies?.find((movie) => movie.id === Number(movieId));


  if (!movie) {
    return <p>Movie details are not available.</p>;
  }

  return (
    <>
      <MovieDetails movie={movie} />
      <Showtimes movieId={movie?.id} />
    </>
  );
};
