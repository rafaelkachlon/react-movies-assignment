  import { useEffect, useState } from 'react';
  import { getShowtimes } from '../services/movieService';
  import { useShowtimeStore } from '../stores/seatsStore';
  import Showtime from '../models/showtime.model';
  import { useLoaderStore } from '../stores/loaderStore';

  const useShowtimes = (movieId: number) => {
    const [error, setError] = useState<string | null>(null);
    const { showtimes, setShowtimes } = useShowtimeStore();
    const { showLoading, hideLoading } = useLoaderStore();

    const filteredShowtimes: Showtime[] = showtimes.filter((showtime) => showtime.movieId === movieId);

    useEffect(() => {
      const fetchShowtimes = async () => {
        showLoading();
        try {
          if (movieId && filteredShowtimes.length === 0) {
            const fetchedShowtimes: Showtime[] = await getShowtimes(movieId);
            setShowtimes(fetchedShowtimes);
          }
        } catch {
          setError('Failed to fetch showtimes.');
        } finally {
          hideLoading();
        }
      };

      fetchShowtimes();
    }, [movieId, showtimes.length, setShowtimes, showLoading, filteredShowtimes.length, hideLoading]);

    return { showtimes: filteredShowtimes, error };
  };

  export default useShowtimes;
