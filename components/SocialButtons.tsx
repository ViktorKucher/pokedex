import { signIn } from "next-auth/react";
import { FacebookButton, GoogleButton } from "./ui/Button";

export const SocialButtons = () => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <GoogleButton onClick={() => signIn("google",{redirect:false})} />
      <FacebookButton onClick={() => signIn("facebook",{redirect:false})} />
    </div>
  );
};
