const BASE_URL: string = 'http://localhost:3001/movies';

export const getMovies = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getMovie = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (response.status === 404) {
    throw new Error(`Movie with ID ${id} not found (404).`);
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch movie with ID ${id}.`);
  }
  return response.json();
};
