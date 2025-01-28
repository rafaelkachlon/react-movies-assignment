import StarIcon from '@mui/icons-material/Star';
import './Rating.scss';

interface RatingProps {
  rating: string | number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="rating">
      <StarIcon fontSize="inherit"/>
      <span>{rating}</span>
    </div>
  );
};
