import useShowtimes from '../../../../hooks/useShowtimes.ts';
import './Showtimes.scss';
import { useNavigate } from 'react-router';

interface ShowtimesProps {
  movieId: string | undefined;
}

export const Showtimes = ({ movieId }: ShowtimesProps) => {
  const { showtimes, error } = useShowtimes(movieId);
  const navigate = useNavigate();

  if (error) {
    return <div>{error}</div>;
  }

  if (!showtimes.length) {
    return <div className="no-showtimes">No showtimes available for this movie.</div>;
  }
  const handleShowtimeClick = (showtimeId: string) => {
    navigate(`${window.location.pathname}/booking/${showtimeId}`);
  };
  return (
    <>
      <div>Available Showtimes:</div>
      <div className="showtime-cards">
        {showtimes.map((showtime) => {
          const availableSeats = showtime.seats.filter((seat) => seat.status === 'Available').length;
          const status = availableSeats > 0 ? 'Seats Available' : 'Sold Out';

          return (
            <div key={showtime.id}
                 onClick={() => availableSeats > 0 && handleShowtimeClick(showtime.id)}
                 className="showtime-card">
              <h3 className="theater-name">{showtime.theater}</h3>
              <p className="start-time">
                <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString('he-IL')}
              </p>
              <p className="available-seats">
                <strong>Available Seats:</strong>{' '}
                {availableSeats}
              </p>
              <p className={`status ${status === 'Sold Out' ? 'status-sold-out' : 'status-available'}`}>
                {status}
              </p>
            </div>
          );
        })}
      </div>

    </>
  );
};
