import { useEffect, useState } from "react";
import { useCallback } from "../@lib";

export const useDebounce = ({
  setValue,
  ms,
}: {
  setValue: (value: string) => void;
  ms: number;
}) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const debounceChange = useCallback(
    (value: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeout = setTimeout(() => {
        setValue(value);
      }, ms);

      setTimeoutId(newTimeout);
    },
    [timeoutId, setValue, ms],
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debounceChange;
};
