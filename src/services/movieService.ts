import Showtime from '../models/showtime.model';

const BASE_URL: string = 'http://localhost:3001';
const MOVIES_ENDPOINT: string = `${BASE_URL}/movies`;
const SHOWTIMES_ENDPOINT: string = `${BASE_URL}/showtimes`;

export const getMovies = async () => {
  const response = await fetch(`${MOVIES_ENDPOINT}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getMovieById = async (id: string) => {
  const response = await fetch(`${MOVIES_ENDPOINT}/${id}`);
  if (response.status === 404) {
    throw new Error(`Movie with ID ${id} not found (404).`);
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch movie with ID ${id}.`);
  }
  return response.json();
};

export const getShowtimes = async (movieId: number) => {
  const response = await fetch(`${MOVIES_ENDPOINT}/${movieId}/showtimes`);
  if (!response.ok) {
    throw new Error(`Failed to fetch showtimes for movie with ID ${movieId}.`);
  }
  return response.json();
};

export const getShowtimeById = async (showtimeId: string) => {
  const response = await fetch(`${SHOWTIMES_ENDPOINT}/${showtimeId}`);
  if (response.status === 404) {
    throw new Error(`Showtime with ID ${showtimeId} not found (404).`);
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch showtime with ID ${showtimeId}.`);
  }
  return response.json();
};

export const updateShowtime = async (showtimeId: number, updatedShowtime: Showtime) => {
  const response = await fetch(`http://localhost:3001/showtimes/${showtimeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(updatedShowtime),
  });

  if (!response.ok) {
    throw new Error('Failed to update showtime on the server.');
  }

  return response.json();
};
