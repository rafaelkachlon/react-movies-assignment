import { useState, useEffect } from 'react';
import { useLoaderStore } from '../stores/loaderStore';
import { useToastStore } from '../stores/toastStore';
import { useMovieStore } from '../stores/movieStore.ts';
import { getMovies } from '../services/movieService';
import Movie from '../models/movie';

// Define the return type for the hook
interface UseMoviesResult {
  movies: Movie[] | null;
  error: string | null;
}

const useMovies = (): UseMoviesResult => {
  const { movies, isMoviesCached, cacheMovies } = useMovieStore();
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoaderStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchMovies = async () => {
      if (isMoviesCached) return;

      showLoading();
      try {
        const movies: Movie[] = await getMovies();
        cacheMovies(movies);
      } catch {
        const errorMessage = 'Failed to fetch movies.';
        setError(errorMessage);
        addToast(errorMessage, 'error');
      } finally {
        hideLoading();
      }
    };

    fetchMovies();
  }, [isMoviesCached, cacheMovies, showLoading, hideLoading, addToast]);

  return { movies, error };
};

export default useMovies;
