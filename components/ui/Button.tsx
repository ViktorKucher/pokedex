import React from "react";
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
  undefined: "rounded-lg p-3 bg-purple-800 hover:bg-purple-700",
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
export const FacebookIconSVG = () => (
  <svg
    className="w-4 h-4 me-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 8 19"
  >
    <path
      fillRule="evenodd"
      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
      clipRule="evenodd"
    />
  </svg>
);
export const GoogleIconSVG = () => (
  <svg
    className="w-4 h-4 me-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 19"
  >
    <path
      fillRule="evenodd"
      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
      clipRule="evenodd"
    />
  </svg>
);
export const FacebookButton = () => {
  return (
    <button
      type="button"
      className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
    >
      <FacebookIconSVG />
      Sign in with Facebook
    </button>
  );
};
export const GoogleButton = () => {
  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
    >
      <GoogleIconSVG />
      Sign in with Google
    </button>
  );
};
