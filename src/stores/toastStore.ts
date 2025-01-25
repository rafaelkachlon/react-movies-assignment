import { create } from 'zustand';

export type severity = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  severity: severity;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, severity?: severity) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, severity = 'info') => {
    const id: string = Math.random().toString(36).slice(2, 11);
    set((state) => ({
      toasts: [...state.toasts, { id, message, severity }],
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
