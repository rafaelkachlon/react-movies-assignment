import Movie from '../models/movie.model.ts';
import { create } from 'zustand';

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  hasFetchedMovies: boolean;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  hasFetchedMovies: false,
  setMovies: (movies: Movie[]) => set({ movies, hasFetchedMovies: true })
}));
