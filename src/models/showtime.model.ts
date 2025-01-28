import Seat from './seat.model.ts';

export default interface Showtime {
  id: number;
  movieId: number;
  theater: string;
  startTime: string;
  availableSeats: number;
  totalSeats: number;
  seats: Seat[];
}

