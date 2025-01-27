import { useState, useEffect } from 'react';
import Showtime from '../models/showtime';
import { getShowtimes } from '../services/movieService';
import { useToastStore } from '../stores/toastStore';

const useShowtimes = (movieId: string | undefined) => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        if (movieId) {
          const fetchedShowtimes = await getShowtimes(movieId);
          setShowtimes(fetchedShowtimes);
        }
      } catch {
        const message: string = 'Something went wrong while fetching the showtimes.';
        setError(message);
        addToast(message, 'error');
      }
    };
    fetchShowtimes();
  }, [movieId, addToast]);

  return { showtimes, error };
};

export default useShowtimes;
