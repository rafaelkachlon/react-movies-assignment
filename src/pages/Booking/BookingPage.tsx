// import { useEffect, useState } from 'react';
// import Showtime from '../../models/showtime';
// import { getShowtimes } from '../../services/movieService';
// import { useParams } from 'react-router';
//
// export const BookingPage = () => {
//   const { showtimeId } = useParams<{ showtimeId: string }>();
//   const [showtime, setShowtime] = useState<Showtime | null>(null);
//   const [error, setError] = useState<string | null>(null);
//
//   useEffect(() => {
//     const fetchShowtime = async () => {
//       try {
//         const fetchedShowtime = await getShowtimes(showtimeId!);
//         setShowtime(fetchedShowtime);
//       } catch {
//         setError('Failed to load showtime details.');
//       }
//     };
//
//     fetchShowtime();
//   }, [showtimeId]);
//
//   if (error) {
//     return <div className="error">{error}</div>;
//   }
//
//   if (!showtime) {
//     return <div>Loading...</div>;
//   }
//
//   return (
//     <div className="booking-page">
//       <h1>Booking for {showtime.theater}</h1>
//       <p>
//         <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString()}
//       </p>
//       <div className="seat-map">
//         <h2>Seat Map</h2>
//         <div className="seats">
//           {showtime.seats.map((seat) => (
//             <button
//               key={seat.seat}
//               className={`seat ${seat.status === 'Available' ? 'available' : 'booked'}`}
//               disabled={seat.status !== 'Available'}
//             >
//               {seat.seat}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Showtime from '../../models/showtime';
import { getShowtimeById } from '../../services/movieService';
import './BookingPage.scss';

export const BookingPage = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const fetchedShowtime = await getShowtimeById(showtimeId!);
        setShowtime(fetchedShowtime);
      } catch {
        setError('Failed to load showtime details.');
      }
    };

    fetchShowtime();
  }, [showtimeId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!showtime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-page">
      <h1>Booking for {showtime.theater}</h1>
      <p>
        <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleString()}
      </p>
      <div className="seat-map">
        <h2>Seat Map</h2>
        <div className="seats">
          {showtime.seats.map((seat) => (
            <button
              key={seat.seat}
              className={`seat ${seat.status === 'Available' ? 'available' : 'booked'}`}
              disabled={seat.status !== 'Available'}
            >
              {seat.seat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
