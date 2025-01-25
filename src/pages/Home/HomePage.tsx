import { useEffect, useState } from 'react';
import { MovieList } from './components/MovieList/MovieList.tsx';
import { useMovieStore } from '../../stores/movieStore.ts';
import { SearchInput } from '../../components/SearchInput/SearchInput.tsx';
import Movie from '../../models/movie.ts';


export const HomePage = () => {
  const { movies, fetchMovies } = useMovieStore();
  const [searchTerm, setSearchTerm] = useState<string>(''); // Local state for the search term

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filteredMovies = movies.filter((movie: Movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Welcome to the Movie App</h1>
      <SearchInput value={searchTerm}
                   onChange={setSearchTerm}
                   placeholder="Search for a movie"/>
      <MovieList movies={filteredMovies}/>
    </>
  );
};
