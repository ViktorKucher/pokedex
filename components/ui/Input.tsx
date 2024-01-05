import { ChangeEventHandler, HTMLInputTypeAttribute, Key } from "react";

interface IInput {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}
const styleInput = {
  text: "text-black p-2 rounded-md",
  password: "text-black p-2 rounded-md",
  email: "text-black p-2 rounded-md",
  file: "border-1 file:text-white file:rounded-md file:p-2 file:bg-blue-700 file:hover:bg-blue-600",
};
export const Input = ({
  name,
  placeholder,
  type,
  onChange,
  value,
}: IInput) => {
  return (
    <input
      className={styleInput[type as keyof typeof styleInput]}
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
};
