import { useParams } from 'react-router';
import { useState } from 'react';
import { useLoaderStore } from '../../stores/loaderStore.ts';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails.tsx';
import { updateShowtime } from '../../services/movieService.ts';
import useShowtimes from '../../hooks/useShowtimes.ts';
import Showtime from '../../models/showtime.model.ts';
import Seat from '../../models/seat.model.ts';
import SeatMap from './components/SeatMap/SeatMap.tsx';
import BookingActions from './components/BookingActions/BookingActions.tsx';
import useMovies from '../../hooks/useMovies.ts';
import Movie from '../../models/movie.model.ts';
import './BookingPage.scss';
import { BackButton } from '../../components/BackButton/BackButton.tsx';

export const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { showLoading, hideLoading } = useLoaderStore();
  const { getShowtimeById, setSeats, error } = useShowtimes(Number(movieId), Number(showtimeId));

  const showtime: Showtime | undefined = getShowtimeById(Number(showtimeId));
  const { getMovieById } = useMovies();
  if (error) {
    return <p>{error}</p>;
  }

  if (!showtime) {
    return <p>Loading showtime details...</p>;
  }

  const handleSeatClick = (seat: Seat): void => {
    setSelectedSeats((prevSelectedSeats: Seat[]) =>
      prevSelectedSeats.some((s) => s.seat === seat.seat)
        ? prevSelectedSeats.filter((s) => s.seat !== seat.seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleConfirmBooking = async (): Promise<void> => {
    if (!showtime) return;

    const updatedSeats: Seat[] = showtime.seats.map((seat) =>
      selectedSeats.some((s) => s.seat === seat.seat) ? { ...seat, status: 'Sold' } : seat
    );
    const updatedShowtime: Showtime = { ...showtime, seats: updatedSeats };

    showLoading();
    try {
      const response = await updateShowtime(showtime.id, updatedShowtime);
      setSeats(showtime.id, response.seats);
      setSelectedSeats([]);
      alert('Booking confirmed!');
    } catch (error) {
      console.error('Error updating showtime:', error);
      alert('Failed to confirm booking.');
    } finally {
      hideLoading();
    }
  };

  const movie: Movie | undefined = getMovieById(Number(movieId));
  return (
    <div className="booking-page">
      <BackButton to={-1}/>
      <MovieDetails movie={movie}/>
      <h1>Booking for {showtime.theater}</h1>
      <p>
        <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString()}
      </p>

      <SeatMap seats={showtime.seats}
               onSeatClick={handleSeatClick}
               selectedSeats={selectedSeats.map((s) => s.seat)}/>


      {selectedSeats.length > 0 && (
        <BookingActions selectedSeats={selectedSeats.map((s: Seat) => ({
          seat: s.seat,
          status: s.status,
          price: s.price,
        }))}
                        onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};
