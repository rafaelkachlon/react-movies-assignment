import { useLoaderStore } from '../stores/loaderStore.ts';
import { CircularProgress } from '@mui/material';

export const GlobalLoader = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <CircularProgress color="inherit"/>
    </div>
  );
};
