import { NavigateFunction, Path, useNavigate } from 'react-router';
import './BackButton.scss';

interface BackButtonProps {
  label?: string;
  to?: string | Partial<Path>;
}

export const BackButton = ({ label = 'Back', to = '/' }: BackButtonProps) => {
  const navigate: NavigateFunction = useNavigate();
  const handleBack = () => {
    navigate(to);
  };
  return (
    <button
      onClick={handleBack}
      className="back-button"> ⬅ {label}</button>);
};
