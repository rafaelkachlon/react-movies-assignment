import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getMovie } from '../../services/movieService.ts';
import Movie from '../../models/movie.ts';
import { useToastStore } from '../../stores/toastStore.ts';
import { useLoaderStore } from '../../stores/loaderStore.ts';
import './components/MovieDetails/MovieDetails.scss';
import { MovieDetails } from './components/MovieDetails/MovieDetails.tsx';
import { Showtimes } from './components/Showtimes/Showtimes.tsx';

export const MovieShowtimes = () => {
  const { addToast } = useToastStore();
  const { showLoading, hideLoading, isLoading } = useLoaderStore();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>();
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchMovie = async (): Promise<void> => {
      try {
        showLoading();
        const data = await getMovie(movieId!);
        setMovie(data);
      } catch (err: any) {
        if (err.message.includes('404')) {
          const message: string = 'The movie you are looking for does not exist.';
          addToast(message, 'error');
          setError(message);
        } else {
          const message: string = 'Something went wrong while fetching the movie.';
          setError(message);
          addToast(message, 'error');
        }
      } finally {
        hideLoading();
      }
    };
    fetchMovie();
  }, [movieId, addToast, hideLoading, showLoading]);
  if (isLoading) {
    return null; // Full-page loader is already shown, no need to render anything here
  }

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
