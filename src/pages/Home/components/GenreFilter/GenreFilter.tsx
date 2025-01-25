import './GenreFilter.scss';

interface GenreFilterProps {
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
}

export const GenreFilter = ({ selectedGenre, onGenreChange }: GenreFilterProps) => {
  return (
    <select
      value={selectedGenre || ''}
      onChange={(e) => onGenreChange(e.target.value || null)}
      className="genre-filter"
    >
      <option value="">All Genres</option>
      <option value="Action">Action</option>
      <option value="Drama">Drama</option>
      <option value="Sci-Fi">Sci-Fi</option>
      <option value="Comedy">Comedy</option>
    </select>
  );
};
