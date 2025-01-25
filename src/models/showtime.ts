import Ticket from './ticket.ts';

export default interface Showtime {
  id: string;
  movieId: string;
  theater: string;
  startTime: string;
  availableSeats: number;
  totalSeats: number;
  tickets: Ticket[];
}

