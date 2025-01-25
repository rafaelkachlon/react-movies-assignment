import { useEffect, useState } from 'react';
import { getMovies } from '../../services/movieService.ts';
import { MovieList } from './components/MovieList/MovieList.tsx';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(movies => setMovies(movies)).catch(error => console.log(error));
  }, []);
  return (
    <>
      <h1>Welcome to the Movie App</h1>
      {/*<Filter />*/}
      {/*<Search />*/}
      <MovieList movies={movies}/>
    </>
  );
};
