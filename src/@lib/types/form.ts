export interface UseFormProps<T> {
  initialState: T;
  validate: (values: T) => ValidationError<T>;
  onSubmit: (values: T) => void;
}

export interface FormValues {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

export type ValidationError<T> = {
  [K in keyof T]?: string;
};
