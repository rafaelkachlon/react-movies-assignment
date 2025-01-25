import { useEffect, useState } from 'react';
import Showtime from '../../../../models/showtime.ts';
import { getShowtimes } from '../../../../services/movieService.ts';
import { useToastStore } from '../../../../stores/toastStore.ts';

interface ShowtimesProps {
  movieId: string | undefined;
}

export const Showtimes = ({ movieId }: ShowtimesProps) => {
  const { addToast } = useToastStore();
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        if (movieId) {
          const showtimes = await getShowtimes(movieId);
          setShowtimes(showtimes);
        }
      } catch {
        const message: string = 'Something went wrong while fetching the showtimes.';
        setError(message);
        addToast(message, 'error');
      }
    };
    fetchShowtimes();
  }, [movieId, addToast]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!showtimes.length) {
    return <div>No showtimes available for this movie.</div>;
  }

  return (
    <>
      <div>Available Showtimes:</div>
      <ul>
        {showtimes.map((showtime: Showtime) => (
          <li key={showtime.id}>
            {showtime.theater} - {showtime.startTime.toString()}
          </li>
        ))}
      </ul>

    </>
  );
};
