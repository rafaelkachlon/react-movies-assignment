import { useState, useEffect } from 'react';
import { useLoaderStore } from '../stores/loaderStore';
import { useToastStore } from '../stores/toastStore';
import { useMovieStore } from '../stores/movieStore.ts';
import { getMovies } from '../services/movieService';
import Movie from '../models/movie.model.ts';

interface UseMoviesResult {
  movies: Movie[] | null;
  error: string | null;
}

const useMovies = (): UseMoviesResult => {
  const { movies, hasFetchedMovies, setMovies } = useMovieStore();
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoaderStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchMovies = async () => {
      if (hasFetchedMovies) return;

      showLoading();
      try {
        const movies: Movie[] = await getMovies();
        setMovies(movies);
      } catch {
        const errorMessage: string = 'Failed to fetch movies.';
        setError(errorMessage);
        addToast(errorMessage, 'error');
      } finally {
        hideLoading();
      }
    };

    fetchMovies();
  }, [hasFetchedMovies, setMovies, showLoading, hideLoading, addToast]);

  return { movies, error };
};

export default useMovies;
