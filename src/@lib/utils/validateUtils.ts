import { FormValues, ValidationError } from "../types";

export const isObject = <T>(obj: T) => {
  if (obj === null) return false;
  return typeof obj === "object";
};

/**
 * Form 값을 검증하는 함수
 * TODO: 본래 제네릭한 순수 함수로 설계하는 것이 목적이었으나 현재 FormValues 타입에만 대응
 */
export function validateForm(values: FormValues): ValidationError<FormValues> {
  const errors: ValidationError<FormValues> = {};

  if (!values.name) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "유효한 이메일 주소를 입력해주세요.";
  }

  if (values.age <= 0) {
    errors.age = "유효한 나이를 입력해주세요.";
  }

  return errors;
}
