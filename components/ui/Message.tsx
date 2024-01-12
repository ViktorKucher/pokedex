import React from "react";

export const TextMessageError = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm text-red-600 dark:text-red-500">{children}</p>;
};
export const TextMessageSuccess = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className="text-sm text-green-600 dark:text-green-500">{children}</p>
  );
};





