import { useSession } from "next-auth/react";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface IInput {
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
}

const STYLE_DEFAULT_INPUT = "text-black border-2 border-black p-2 rounded-md w-full";

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
  );
};

export const SearchInput = ({
  getDataInput,
}: {
  getDataInput: (text: string) => void;
}) => {
  const [searchData, setSearchData] = useState("");
  const onClick = () => getDataInput(searchData);

  return (
    <div className="flex max-w-sm">
      <Input
        placeholder="Name or Id Pokemon"
        type="text"
        onChange={(event) => setSearchData(event.target.value)}
      />
      <div
        onClick={onClick}
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IoSearch size={20} />
      </div>
    </div>
  );
};
