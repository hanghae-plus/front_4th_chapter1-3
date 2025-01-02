// import { useState } from "react";
// import { useDebounce } from "../hooks/useDebounce";

interface SearchbarProps {
  placeholder: string;
  className: string;
  setValue: (value: string) => void;
}

export const Searchbar = ({
  placeholder,
  //   setValue,
  className,
}: SearchbarProps) => {
  //   const [localValue, setLocalValue] = useState("");
  //   const debounceChange = useDebounce({ setValue, ms: 500 });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const newValue = e.target.value;
  //     setLocalValue(newValue);
  //     debounceChange(newValue);
  //   };

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        // value={localValue}
        // onChange={(e) => setValue(e.target.value)}
        className={className}
      />
    </>
  );
};
