import { Navigate, Route, Routes } from 'react-router';
import { BookingPage } from '../pages/Booking/BookingPage.tsx';
import { HomePage } from '../pages/Home/HomePage.tsx';
import { MovieShowtimes } from '../pages/MovieShowtimes/MovieShowtimes.tsx';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage.tsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies" replace />} />
      <Route path="/movies" element={<HomePage/>}/>
      <Route path="/movies/:movieId" element={<MovieShowtimes/>}/>
      <Route path="booking/:showtimeId" element={<BookingPage/>}/>
      <Route path="/not-found" element={<NotFoundPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
