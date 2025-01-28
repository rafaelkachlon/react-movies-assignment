import { NavigateFunction, useNavigate } from 'react-router';

interface BackButtonProps {
  label?: string;
  to?: string | number;
}

export const BackButton = ({ label = 'Back', to = '/' }: BackButtonProps) => {
  const navigate: NavigateFunction = useNavigate();
  const handleBack = () => {
    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to);
    }
  };
  return (
    <button
      onClick={handleBack}
      className="back-button"
      style={{ display: 'flex', padding: '5px', marginBottom: '10px' }}> ⬅ {label}    </button>);
};
