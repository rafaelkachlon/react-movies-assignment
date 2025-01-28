import { create } from 'zustand';
import Showtime from '../models/showtime.model';
import Seat from '../models/seat.model';

interface ShowtimeStoreState {
  showtimes: Record<number, Showtime>;
  setShowtimes: (showtimes: Showtime[]) => void;
  setSeats: (showtimeId: number, seats: Seat[]) => void;
  getShowtimeById: (id: number) => Showtime | undefined;
}

export const useShowtimeStore = create<ShowtimeStoreState>((set, get) => ({
  showtimes: {},
  setShowtimes: (newShowtimes: Showtime[]) =>
    set((state: ShowtimeStoreState): Partial<ShowtimeStoreState> => {
      const updatedShowtimes: Record<number, Showtime> = { ...state.showtimes };
      newShowtimes.forEach((showtime) => {
        updatedShowtimes[showtime.id] = showtime;
      });
      return { showtimes: updatedShowtimes };
    }),
  setSeats: (showtimeId, updatedSeats) =>
    set((state: ShowtimeStoreState) => {
      const existingShowtime = state.showtimes[showtimeId];
      if (!existingShowtime) return state;
      const newSeats: Seat[] = existingShowtime.seats.map((seat) =>
        updatedSeats.some((updatedSeat) => updatedSeat.seat === seat.seat)
          ? { ...seat, ...updatedSeats.find((s) => s.seat === seat.seat) }
          : seat
      );

      return {
        showtimes: {
          ...state.showtimes,
          [showtimeId]: { ...existingShowtime, seats: newSeats },
        },
      };
    }),

  getShowtimeById: (id: number) => get().showtimes[id],
}));
