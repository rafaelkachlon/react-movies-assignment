import { useEffect, useState } from 'react';
import { useLoaderStore } from '../stores/loaderStore';
import { useToastStore } from '../stores/toastStore';
import { useMovieStore } from '../stores/movieStore.ts';
import { getMovies } from '../services/movieService';
import Movie from '../models/movie.model.ts';

interface UseMoviesResult {
  movies: { [id: number]: Movie } | null;
  error: string | null;
  getMovieById: (id: number) => Movie | undefined;
}

const useMovies = (): UseMoviesResult => {
  const { movies, hasFetchedMovies, setMovies, getMovieById } = useMovieStore();
  const [error, setError] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoaderStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchMovies = async () => {
      if (hasFetchedMovies) return;

      showLoading();

      try {
        const fetchedMovies = await getMovies();
        setMovies(fetchedMovies);
      } catch {
        const errorMessage = 'Failed to fetch movies.';
        setError(errorMessage);
        addToast(errorMessage, 'error');
      } finally {
        hideLoading();
      }
    };

    fetchMovies();
  }, [hasFetchedMovies, setMovies, showLoading, hideLoading, addToast]);

  return { movies: Object.keys(movies).length > 0 ? movies : null, error, getMovieById };
};

export default useMovies;
