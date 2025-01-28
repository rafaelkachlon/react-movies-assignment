import './Showtimes.scss';
import { Link } from 'react-router';
import { useLoaderStore } from '../../../../stores/loaderStore';
import useShowtimes from '../../../../hooks/useShowtimes';

interface ShowtimesProps {
  movieId: number;
}


export const Showtimes = ({ movieId }: ShowtimesProps) => {
  const { showtimes, error } = useShowtimes(movieId);
  const { isLoading } = useLoaderStore();

  if (isLoading) {
    return null;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!showtimes.length) {
    return <div className="no-showtimes">No showtimes available for this movie.</div>;
  }
  return (
    <div className="showtime-cards">
      {showtimes.map((showtime) => {
        const availableSeats = showtime.seats.filter((seat) => seat.status === 'Available').length;
        const status = availableSeats > 0 ? 'Seats Available' : 'Sold Out';

        return (
          <Link to={`${window.location.pathname}/booking/${showtime.id}`} key={showtime.id} className="movie-item">
            <div key={showtime.id}
                 className="showtime-card">
              <h3 className="theater-name">{showtime.theater}</h3>
              <p className="start-time">
                <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString('he-IL')}
              </p>
              <p className="available-seats">
                <strong>Available Seats:</strong> {availableSeats}
              </p>
              <p className={`status ${status === 'Sold Out' ? 'status-sold-out' : 'status-available'}`}>{status}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
