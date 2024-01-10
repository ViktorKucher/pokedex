import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface IInput {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
}

const STYLE_DEFAULT_INPUT = "text-black p-2 rounded-md w-full";

const styleInput = {
  text: STYLE_DEFAULT_INPUT,
  password: STYLE_DEFAULT_INPUT,
  email: STYLE_DEFAULT_INPUT,
  file: "border-1 file:text-white file:rounded-md file:p-2 file:bg-blue-700 file:hover:bg-blue-600",
  error: STYLE_DEFAULT_INPUT + " border-2 border-red-500",
};

export const Input = ({
  name,
  placeholder,
  type,
  onChange,
  value,
  error,
}: IInput) => {
  return (
    <>
      <input
        className={
          error ? styleInput.error : styleInput[type as keyof typeof styleInput]
        }
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
