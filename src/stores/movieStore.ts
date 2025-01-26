import Movie from '../models/movie.ts';
import { create } from 'zustand';

interface MovieState {
  movies: Movie[];
  isMoviesCached: boolean;
  cacheMovies: (movies: Movie[]) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isMoviesCached: false,
  cacheMovies: (movies: Movie[]) => set({ movies, isMoviesCached: true })
}));
