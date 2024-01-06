import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface IInput {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
}

const styleDefaultInput = "text-black p-2 rounded-md";

const styleInput = {
  text: styleDefaultInput,
  password: styleDefaultInput,
  email: styleDefaultInput,
  file: "border-1 file:text-white file:rounded-md file:p-2 file:bg-blue-700 file:hover:bg-blue-600",
  error: styleDefaultInput + " border-2 border-red-500",
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
