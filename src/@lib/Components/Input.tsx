import { useState } from "react";

type InputProps = {
  value: string;
  onChangeValue: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const Input = ({ value, onChangeValue, ...props }: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <input
      {...props}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => onChangeValue(inputValue)}
    />
  );
};
