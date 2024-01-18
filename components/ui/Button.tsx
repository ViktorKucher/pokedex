import React from "react";
import { FacebookIconSVG, GoogleIconSVG} from "./Icons";
interface IButton {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
}

const styleButton = {
  submit:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  button:
    "rounded-lg border-2 border-white p-3 hover:bg-gray-900 dark:hover:bg-gray-700",
  undefined: "w-full rounded-lg p-3 bg-purple-800 hover:bg-purple-700",
};

export const Button = ({ children, type, onClick }: IButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styleButton[type as keyof typeof styleButton]}
    >
      {children}
    </button>
  );
};

export const FacebookButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
      onClick={onClick}
    >
      <FacebookIconSVG />
      Sign in with Facebook
    </button>
  );
};

export const GoogleButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
      onClick={onClick}
    >
      <GoogleIconSVG />
      Sign in with Google
    </button>
  );
};

