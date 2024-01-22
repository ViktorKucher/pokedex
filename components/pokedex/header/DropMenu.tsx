'use client'
import { IoMdExit } from "react-icons/io";
import { signOut } from "next-auth/react";
import { SiOpsgenie } from "react-icons/si";
import { Profile } from "./Profile";

export const DropMenu = () => {
  return (
    <div className="gap-2 relative group">
      <SiOpsgenie size={30} />
      <div className=" transition-all h-0 overflow-hidden min-w-max delay-300 duration-700 ease-in-out absolute top-8 right-0 group-hover:h-40">
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <Profile/>
          </li>
          <li className="flex gap-1 w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 dark:hover:bg-gray-500">
            Settings
          </li>
          <li
            className="flex gap-1 w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 dark:hover:bg-gray-500"
            onClick={() => signOut({ redirect: false })}
          >
            <IoMdExit size={20} />
            Exit
          </li>
        </ul>
      </div>
    </div>
  );
};
