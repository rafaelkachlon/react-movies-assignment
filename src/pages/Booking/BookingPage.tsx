import { useParams } from 'react-router';
import { useState, useMemo } from 'react';
import { useShowtimeStore } from '../../stores/seatsStore.ts';
import { updateShowtime } from '../../services/movieService.ts';
import { useLoaderStore } from '../../stores/loaderStore.ts';
import useShowtimes from '../../hooks/useShowtimes.ts';
import Showtime from '../../models/showtime.model.ts';
import Seat from '../../models/seat.model.ts';
import './BookingPage.scss';
import SeatMap from './components/SeatMap/SeatMap.tsx';
import BookingActions from './components/BookingActions/BookingActions.tsx';
import useMovies from '../../hooks/useMovies.ts';
import Movie from '../../models/movie.model.ts';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails.tsx';

export const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { showLoading, hideLoading } = useLoaderStore();
  const { setSeats } = useShowtimeStore();
  const { movies } = useMovies();
  const { showtimes } = useShowtimes(Number(movieId));

  const showtime: Showtime | undefined = useMemo(
    () => showtimes.find((s) => s.id === Number(showtimeId)),
    [showtimes, showtimeId]
  );

  if (!showtime) {
    return <p>Showtime not found. Please go back and try again.</p>;
  }

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.some((s) => s.seat === seat.seat)
        ? prevSelectedSeats.filter((s) => s.seat !== seat.seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const handleConfirmBooking = async () => {
    const updatedSeats: Seat[] = showtime.seats.map((seat) =>
      selectedSeats.some((s) => s.seat === seat.seat) ? { ...seat, status: 'Sold' } : seat
    );

    const updatedShowtime: Showtime = { ...showtime, seats: updatedSeats };

    showLoading();

    try {
      const response = await updateShowtime(showtime.id, updatedShowtime);
      setSeats(response.id, response.seats);
      setSelectedSeats([]);
      alert('Booking confirmed!');
    } catch (error) {
      console.error('Error updating showtime:', error);
      alert('Failed to confirm booking. Please try again.');
    } finally {
      hideLoading();
    }
  };

  const movie: Movie | undefined = movies?.find((movie) => movie.id === Number(movieId));

  return (
    <div className="booking-page">
      <MovieDetails movie={movie!}/>
      <h1>Booking for {showtime.theater}</h1>
      <p>
        <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString()}
      </p>

      <SeatMap seats={showtime.seats} onSeatClick={handleSeatClick} selectedSeats={selectedSeats.map((s) => s.seat)}/>

      {selectedSeats.length > 0 && (
        <BookingActions
          selectedSeats={selectedSeats.map((s) => ({ seat: s.seat, status: s.status, price: s.price }))}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};
