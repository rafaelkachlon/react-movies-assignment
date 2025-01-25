import { GenreFilter } from '../GenreFilter/GenreFilter.tsx';
import { RatingSlider } from '../RatingSlider/RatingSlider.tsx';
import { SearchInput } from '../../../../components/SearchInput/SearchInput.tsx';

interface InputControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  selectedRatingRange: [number, number];
  onRatingChange: (range: [number, number]) => void;
}

export const InputControls = ({
                                searchTerm,
                                onSearchChange,
                                selectedGenre,
                                onGenreChange,
                                selectedRatingRange,
                                onRatingChange,
                              }: InputControlsProps) => {
  return (
    <div className="input-controls-container">
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search for a movie"
      />
      <GenreFilter selectedGenre={selectedGenre} onGenreChange={onGenreChange}/>
      <RatingSlider
        selectedRatingRange={selectedRatingRange}
        onRatingChange={onRatingChange}
      />
    </div>
  );
};
