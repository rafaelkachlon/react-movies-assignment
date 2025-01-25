import { useEffect } from 'react';
import { MovieList } from './components/MovieList/MovieList.tsx';
import { useMovieStore } from '../../stores/movieStore.ts';


export const HomePage = () => {
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <h1>Welcome to the Movie App</h1>
      <MovieList movies={movies}/>
    </>
  );
};
