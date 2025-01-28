import './App.css';
import AppRoutes from './routes/AppRoutes.tsx';
import { Toast } from './components/Toast/Toast.tsx';
import { GlobalLoader } from './components/GlobalLoader/GlobalLoader.tsx';

function App() {

  return (
    <>
      <GlobalLoader/>
      <Toast/>
      <AppRoutes/>
    </>
  );
}

export default App;
