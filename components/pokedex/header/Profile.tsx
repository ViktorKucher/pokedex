"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
export const Profile = () => {
  const { data } = useSession();
  return (
    <>
      <div className="flex gap-2">
        {data?.user.picture ? (
          <Image
            className="rounded-full"
            src={data.user.picture}
            height={35}
            width={35}
            alt="dd"
          />
        ) : (
          <CgProfile size={35} />
        )}
        <p className="text-right">{data?.user.name}</p>
      </div>
    </>
  );
};
