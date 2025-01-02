import { FormValues, ValidationError } from "../types/types.ts";

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
