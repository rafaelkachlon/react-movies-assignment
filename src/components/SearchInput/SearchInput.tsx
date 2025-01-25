import { ChangeEvent } from 'react';
import './SearchInput.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <input type="text"
           value={value}
           className="search-input"
           onChange={handleInputChange}
           placeholder={placeholder}/>
  );
};
