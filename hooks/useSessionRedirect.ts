import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const useSessionRedirect = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const urlRedirect = useRef<string>();
  useEffect(() => {
    if (data?.user && urlRedirect.current) {
      router.push(urlRedirect.current);
    }
  }, [data, router, status]);
  return (url: string) => (urlRedirect.current = url);
};
