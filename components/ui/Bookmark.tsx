import { formatCounterDate } from "@/functions/default";
import { useTheme } from "next-themes";
import { CiBookmark } from "react-icons/ci";

export const BookmarkCounter = ({ count }: { count?: number }) => {
  const value = formatCounterDate(count);
  const {resolvedTheme}=useTheme()
  return (
    <div className="relative">
      <CiBookmark size={30} color={resolvedTheme==='light'?"black":'white'}/>
      <div className="absolute text-sm inline-block align-middle min-h-5 min-w-5 -top-1 -right-1 bg-red-600 px-0.5 text-center rounded-full">
        {value}
      </div>
    </div>
  );
};
