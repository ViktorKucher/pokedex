import { ChangeEventHandler } from "react";

export const Select = ({
  onChange,
  listOptions,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  listOptions: { value: string; text: string }[];
}) => {
  return (
    <select
      name="select"
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {listOptions.map((item, index) => (
        <option className="text-sm" key={index} defaultValue={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};
