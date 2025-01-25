import './App.css';
import AppRoutes from './routes/AppRoutes.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';
import { GlobalLoader } from './components/GlobalLoader.tsx';

function App() {

  return (
    <>
      <GlobalLoader/>
      <ToastContainer/>
      <AppRoutes/>
    </>
  );
}

export default App;
