import Movie from '../models/movie.model.ts';
import { create } from 'zustand';

interface MovieState {
  movies: { [id: number]: Movie };
  hasFetchedMovies: boolean;
  setMovies: (movies: Movie[]) => void;
  getMovieById: (id: number) => Movie | undefined;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: {},
  hasFetchedMovies: false,
  setMovies: (movies: Movie[]) =>
    set({
      movies: movies.reduce((acc, movie) => {
        acc[movie.id] = movie;
        return acc;
      }, {} as { [id: number]: Movie }),
      hasFetchedMovies: true,
    }),
  getMovieById: (id: number): Movie | undefined => get().movies[id],
}));
