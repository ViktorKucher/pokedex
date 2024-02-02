"use client";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { Form } from "./ui/Form";
import { SocialButtons } from "./SocialButtons";
import { ButtonLink } from "./ui/Button";
import { VALIDATION_LOGIN_SCHEMA } from "@/constants/yupSchemas";
import { LIST_LOGIN_INPUTS } from "@/constants/inputs";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";
import { EMPTY_STRING } from "@/constants/default";
import { toast } from "sonner";
import { SwitchTheme } from "./SwitchTheme";

export const Login = () => {
  const navigation = useSessionRedirect();
  navigation("/pokedex");
  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
    },
    onSubmit: async (values) => {
      await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((res) => {
        res?.error && toast.error(res.error);
      });
    },
    validationSchema: VALIDATION_LOGIN_SCHEMA,
  });

  
  return (
    <div className="flex flex-col m-0 gap-2 max-w-60 rounded-lg">
      <Form
        title={"Login"}
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        values={formik.values}
        list={LIST_LOGIN_INPUTS}
        errors={formik.errors}
      />
      <span className="text-center text-black dark:text-white">or</span>
      <ButtonLink href="/registration">Registration</ButtonLink>
      <SocialButtons />
      <SwitchTheme style="absolute top-2 right-2"/>
    </div>
  );
};
