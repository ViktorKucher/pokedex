"use client";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { Form } from "./ui/Form";
import { SocialButtons } from "./SocialButtons";
import { Button } from "./ui/Button";
import Link from "next/link";
import { VALIDATION_lOGIN_SCHEMA } from "@/constants/yupSchemas";
import { LIST_LOGIN_INPUTS } from "@/constants/inputs";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";
import { NotificationError } from "./ui/Message";
import { useState } from "react";

export const Login = () => {
  const [notification, setNotification] = useState<string>();
  const navigation = useSessionRedirect();
  navigation("/pokedex");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((res) => {
        res?.error && setNotification(res.error);
      });
    },
    validationSchema: VALIDATION_lOGIN_SCHEMA,
  });

  return (
    <div className="flex flex-col m-0 gap-2">
      <Form
        title={"Login"}
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        values={formik.values}
        list={LIST_LOGIN_INPUTS}
        errors={formik.errors}
      />
      <span className="text-center">or</span>
      <Button>
        <Link href="/registration">Registration</Link>
      </Button>
      <SocialButtons />
      <NotificationError notification={notification} />
    </div>
  );
};
