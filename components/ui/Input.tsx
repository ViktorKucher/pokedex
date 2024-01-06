import { styleInput } from "@/constants/ui";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface IInput {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

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
