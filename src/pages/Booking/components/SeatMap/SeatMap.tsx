import './SeatMap.scss';
import Seat from '../../../../models/seat.model.ts';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onSeatClick: (seat: Seat) => void;
}

const SeatMap = ({ seats, selectedSeats, onSeatClick }: SeatMapProps) => {
  return (
    <div className="seat-map">
      <h2>Seat Map</h2>
      <div className="seats">
        {seats.map((seat) => (
          <button
            key={seat.seat}
            className={`seat ${seat.status.toLowerCase()} ${selectedSeats.includes(seat.seat) ? 'selected' : ''}`}
            disabled={seat.status !== 'Available'}
            onClick={() => onSeatClick(seat)}>
            <div>{seat.seat}</div>
            <div>${seat.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
