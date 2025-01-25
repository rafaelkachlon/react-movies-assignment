import { useEffect, useState } from 'react';
import { MovieList } from './components/MovieList/MovieList.tsx';
import { useMovieStore } from '../../stores/movieStore.ts';
import Movie from '../../models/movie.ts';
import './HomePage.scss';
import { InputControls } from './components/InputControls/InputControls.tsx';

export const HomePage = () => {
  const { movies, fetchMovies } = useMovieStore();
  const [searchTerm, setSearchTerm] = useState<string>(''); // Local state for the search term
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null); // Single genre
  const [selectedRatingRange, setSelectedRatingRange] = useState<[number, number]>([0, 10]); // Rating range

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filteredMovies = movies.filter((movie: Movie) => {
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

      {filteredMovies.length === 0 ? <p>No movies found.</p> : <MovieList movies={filteredMovies}/>}
    </>
  );
};
