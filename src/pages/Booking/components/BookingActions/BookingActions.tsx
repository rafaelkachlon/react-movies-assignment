import './BookingActions.scss';
import Seat from '../../../../models/seat.model.ts';

interface BookingActionsProps {
  selectedSeats: Seat[];
  onConfirm: () => void;
}

const BookingActions = ({ selectedSeats, onConfirm }: BookingActionsProps) => {
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="booking-actions">
      <p>
        <strong>Selected Seats:</strong> {selectedSeats.map((s) => s.seat).join(', ')}
      </p>
      <p>
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </p>
      <button onClick={onConfirm} className="confirm-button">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingActions;
