import { useEffect, useState } from 'react';
import { getMovies } from '../../services/movieService.ts';
import { MovieList } from './components/MovieList/MovieList.tsx';
import { useToastStore } from '../../stores/toastStore.ts';
import Movie from '../../models/movie.ts';
import { useLoaderStore } from '../../stores/loaderStore.ts';


export const HomePage = () => {
  const { addToast } = useToastStore();
  const { showLoading, hideLoading } = useLoaderStore();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        showLoading();
        const movies = await getMovies();
        setMovies(movies);
      } catch {
        addToast('Error fetching movies', 'error');
      } finally {
        hideLoading();
      }
    };

    fetchMovies();
  }, [addToast, hideLoading, showLoading]);
  return (
    <>
      <h1>Welcome to the Movie App</h1>
      <MovieList movies={movies}/>
    </>
  );
};
