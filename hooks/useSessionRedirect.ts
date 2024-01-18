import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const useSessionRedirect = () => {
  const { data } = useSession();
  const router = useRouter();
  const urlRedirect = useRef<string>();
  useEffect(() => {
    if (data?.user && urlRedirect.current) {
      router.push(urlRedirect.current);
    }
  }, [data, router]);
  return (url: string) => (urlRedirect.current = url);
};
