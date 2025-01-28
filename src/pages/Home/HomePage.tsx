import { useState } from 'react';
import { MovieList } from './components/MovieList/MovieList.tsx';
import { InputControls } from './components/InputControls/InputControls.tsx';
import useMovies from '../../hooks/useMovies.ts';
import Movie from '../../models/movie.model.ts';
import './HomePage.scss';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedRatingRange, setSelectedRatingRange] = useState<[number, number]>([0, 10]);
  const { movies, error } = useMovies();

  const filteredMovies = Object.values(movies || {})?.filter((movie: Movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
    const matchesRating = movie.rating >= selectedRatingRange[0] && movie.rating <= selectedRatingRange[1];
    return matchesTitle && matchesGenre && matchesRating;
  });

  return (
    <>
      <h1>Welcome to the Movie App</h1>

      <InputControls searchTerm={searchTerm}
                     onSearchChange={setSearchTerm}
                     selectedGenre={selectedGenre}
                     onGenreChange={setSelectedGenre}
                     selectedRatingRange={selectedRatingRange}
                     onRatingChange={setSelectedRatingRange}/>

      {error && <p>{error}</p>}
      {filteredMovies?.length === 0 ? <p>No movies found.</p> : <MovieList movies={filteredMovies}/>}
    </>
  );
};
