import { Navigate, Route, Routes } from 'react-router';
import { BookingPage } from '../pages/Booking/BookingPage.tsx';
import { HomePage } from '../pages/Home/HomePage.tsx';
import { MovieShowtimesPage } from '../pages/MovieShowtimes/MovieShowtimesPage.tsx';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage.tsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies" replace/>}/>
      <Route path="/movies" element={<HomePage/>}/>
      <Route path="/movies/:movieId" element={<MovieShowtimesPage/>}/>
      <Route path="/movies/:movieId/booking/:showtimeId" element={<BookingPage/>}/>
      <Route path="/not-found" element={<NotFoundPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
