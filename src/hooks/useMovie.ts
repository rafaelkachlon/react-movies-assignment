import { useState, useEffect } from 'react';
import { useLoaderStore } from '../stores/loaderStore';
import { useToastStore } from '../stores/toastStore';
import { getMovie } from '../services/movieService';
import Movie from '../models/movie';

interface UseMovieResult {
  movie: Movie | null;
  error: string | null;
}

const useMovie: (movieId: string) => UseMovieResult = (movieId: string): UseMovieResult => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoaderStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchMovie = async () => {
      showLoading();
      try {
        const data = await getMovie(movieId);
        setMovie(data);
      } catch (err: any) {
        let errorMessage = 'Something went wrong while fetching the movie.';
        if (err.message.includes('404')) {
          errorMessage = 'The movie you are looking for does not exist.';
          setError(errorMessage);
          addToast(errorMessage, 'error');
        } else {
          setError(errorMessage);
          addToast(errorMessage, 'error');
        }
      } finally {
        hideLoading();
      }
    };
    fetchMovie();
  }, [movieId, showLoading, hideLoading, addToast]);

  return { movie, error };
};

export default useMovie;
