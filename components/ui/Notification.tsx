import { ButtonClose } from "./Button";
import { ErrorIcon } from "./Icons";

export const NotificationError = ({notification}:{notification?:string}) => {
    return notification && (
      <div className="absolute flex items-center bottom-1 left-1 p-2 mb-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <ErrorIcon />
        </div>
        <div className="ms-3 text-sm font-normal">{notification}</div>
        <ButtonClose />
      </div>
    );
  };