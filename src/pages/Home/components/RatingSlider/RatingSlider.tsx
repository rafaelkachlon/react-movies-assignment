import { Box, Slider, Stack } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

interface RatingSliderProps {
  selectedRatingRange: [number, number];
  onRatingChange: (newRange: [number, number]) => void;
}

export const RatingSlider = ({ selectedRatingRange, onRatingChange }: RatingSliderProps) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onRatingChange(newValue as [number, number]);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        0<StarBorder/>
        <Slider
          value={selectedRatingRange}
          onChange={handleChange}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
        <Star/>10
      </Stack>
    </Box>
  );
};
