import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getMovie } from '../../services/movieService.ts';
import Movie from '../../models/movie.ts';


export const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>();
  const { movieId } = useParams();

  const fetchMovie = async () => {
    try {
      const data = await getMovie(movieId!);
      setMovie(data);
    } catch (err: any) {
      if (err.message.includes('404')) {
        setError('The movie you are looking for does not exist.');
      } else {
        setError('Something went wrong while fetching the movie.');
      }
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId, navigate]);
  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <>Movie Details of movieId: <pre>{JSON.stringify(movie, null, 2)}</pre> Works!</>
  );
};
