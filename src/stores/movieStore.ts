import Movie from '../models/movie.ts';
import { create } from 'zustand';
import { getMovies } from '../services/movieService.ts';
import { useToastStore } from './toastStore.ts';
import { useLoaderStore } from './loaderStore.ts';

interface MovieState {
  movies: Movie[];
  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  fetchMovies: async () => {
    const { addToast } = useToastStore.getState();
    const { showLoading, hideLoading } = useLoaderStore.getState();
    try {
      showLoading();
      const movies = await getMovies();
      set({ movies });
    } catch (error: any) {
      console.error('Failed to fetch movies:', error.message);
      addToast('Failed to fetch movies', 'error');
    } finally {
      hideLoading();
    }
  }
}));
