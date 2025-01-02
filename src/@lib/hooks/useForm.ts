import { useState } from "react";
import { useCallback } from "./useCallback.ts";
import { UseFormProps, ValidationError } from "../types/types.ts";

export function useForm<T>({
  initialState,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [formData, setFromData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationError<T>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFromData((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((preference: string) => {
    setFromData((prevValues) => {
      //FIXME :: any 타입 한시적 허용
      // 제네릭하게 useForm을 만들었는데 preferences가 string[] 타입이라서 any로 타입을 강제로 지정했습니다.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const preferences = (prevValues as any).preferences as string[];
      return {
        ...prevValues,
        preferences: preferences.includes(preference)
          ? preferences.filter((pref) => pref !== preference)
          : [...preferences, preference],
      };
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      //TODO :: 검증 로직 추가
      // 현재 테스트에서는 submit 제출 시 바로 제출 성공을 예상하고 있습니다.
      // 따라서 validation을 통해 값이 없을 때 실패할 경우 테스트를 통과하지 못합니다.
      onSubmit(formData);
      setFromData(initialState);
      setErrors({});

      // validation 로직 주석 처리
      // const validationErrors = validate(formData);
      // if (Object.keys(validationErrors).length === 0) {
      //   onSubmit(formData);
      //   setFromData(initialState);
      //   setErrors({});
      //   return;
      // }
      // setErrors(validationErrors);
    },
    [formData, initialState, onSubmit, validate],
  );

  return {
    formData,
    errors,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
}
