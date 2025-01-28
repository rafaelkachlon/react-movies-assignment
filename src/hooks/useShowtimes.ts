import { useEffect, useState } from 'react';
import { getShowtimes, getShowtimeById as fetchShowtimeById } from '../services/movieService';
import { useShowtimeStore } from '../stores/seatsStore';
import { useLoaderStore } from '../stores/loaderStore';
import Showtime from '../models/showtime.model';
import Seat from '../models/seat.model';

interface UseShowtimesResult {
  showtimes: Showtime[];
  error: string | null;
  getShowtimeById: (id: number) => Showtime | undefined;
  setSeats: (showtimeId: number, seats: Seat[]) => void;
}
const useShowtimes = (movieId: number, showtimeId?: number): UseShowtimesResult => {
  const [error, setError] = useState<string | null>(null);
  const { showtimes, setShowtimes, getShowtimeById, setSeats } = useShowtimeStore();
  const { showLoading, hideLoading } = useLoaderStore();

  const filteredShowtimes: Showtime[] = Object.values(showtimes).filter((showtime) => showtime.movieId === movieId);

  useEffect(() => {
    const fetchShowtimes: () => Promise<void> = async () => {
      if (movieId && filteredShowtimes.length === 0) {
        showLoading();
        try {
          const fetchedShowtimes: Showtime[] = await getShowtimes(movieId);
          setShowtimes(fetchedShowtimes);
        } catch {
          setError('Failed to fetch showtimes.');
        } finally {
          hideLoading();
        }
      }
    };

    const fetchSingleShowtime: () => Promise<void> = async () => {
      if (showtimeId && !getShowtimeById(showtimeId)) {
        showLoading();
        try {
          const fetchedShowtime: Showtime = await fetchShowtimeById(showtimeId);
          setShowtimes([fetchedShowtime]);
        } catch {
          setError('Failed to fetch showtime.');
        } finally {
          hideLoading();
        }
      }
    };

    fetchShowtimes();
    fetchSingleShowtime();
  }, [movieId, showtimeId, filteredShowtimes.length, getShowtimeById, setShowtimes, showLoading, hideLoading]);

  return {
    showtimes: filteredShowtimes,
    getShowtimeById,
    error,
    setSeats
  };
};

export default useShowtimes;
