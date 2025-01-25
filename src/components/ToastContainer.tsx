import { Snackbar, Alert } from '@mui/material';
import { useToastStore } from '../stores/toastStore.ts';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{ marginBottom: `${index * 60}px`, minWidth: '300px' }}>
          <Alert onClose={() => removeToast(toast.id)}
                 severity={toast.severity}
                 sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
