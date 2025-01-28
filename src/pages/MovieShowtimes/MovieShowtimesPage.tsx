import { useParams } from 'react-router';
import '../../components/MovieDetails/MovieDetails.scss';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails.tsx';
import { Showtimes } from './components/Showtimes/Showtimes.tsx';
import useMovies from '../../hooks/useMovies.ts';
import { BackButton } from '../../components/BackButton/BackButton.tsx';

export const MovieShowtimesPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { getMovieById } = useMovies();
  const movie = getMovieById(Number(movieId));


  if (!movie) {
    return <p>Movie details are not available.</p>;
  }

  return (
    <>
      <BackButton label="Back to movies"/>
      <MovieDetails movie={movie}/>
      <Showtimes movieId={movie?.id}/>
    </>
  );
};
