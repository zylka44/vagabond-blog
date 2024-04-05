import { ChangeEvent, FormEvent, useState } from 'react';

type AllowedInputs = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FormCallback<T> = (values: T) => void;

interface UseForm<T> {
  values: T;
  changeValues: (newValues: T) => void;
  handleChange: (e: ChangeEvent<AllowedInputs>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, callback: FormCallback<T>) => void;
  cleanValues: () => void;
}

export function useForm<T>(initialValues: T): UseForm<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<AllowedInputs>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const changeValues = (newValues: T) => {
    setValues(newValues);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, callback: FormCallback<T>) => {
    e.preventDefault();
    callback(values);
    cleanValues();
  };

  const cleanValues = () => setValues(initialValues);

  return { values, changeValues, handleChange, handleSubmit, cleanValues };
}
