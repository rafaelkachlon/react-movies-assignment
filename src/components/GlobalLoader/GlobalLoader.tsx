import { useLoaderStore } from '../../stores/loaderStore.ts';
import { CircularProgress } from '@mui/material';
import './GlobalLoader.scss';

export const GlobalLoader = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loader-container">
      <CircularProgress color="inherit"/>
    </div>
  );
};
