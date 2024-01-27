"use client";
import { usePokemonStore } from "@/store/pokemon";

export const ButtonPagination = () => {
  const { limit, offset, updateOffset } = usePokemonStore((state) => state);
  const setPrevPage = () => offset != 0 && updateOffset(offset - limit);
  const setNextPage = () => updateOffset(offset + limit);
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          onClick={setPrevPage}
          className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Prev
        </button>
        <div className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
          {offset / limit + 1}
        </div>
        <button
          onClick={setNextPage}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};
