import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  showLoading: (): void => set({ isLoading: true }),
  hideLoading: (): void => set({ isLoading: false })
}));
