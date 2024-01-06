"use client";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { Form } from "./ui/Form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SocialButtons } from "./SocialButtons";
import { Button } from "./ui/Button";
import Link from "next/link";
import { VALIDATION_lOGIN_SCHEMA } from "@/constants/yupSchemas";
import { LIST_LOGIN_INPUTS } from "@/constants/inputs";

export const Login = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data?.user) {
      router.push("/pokedex");
    }
  }, [session, router]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await signIn("login", {
        username: values.username,
        password: values.password,
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
    </div>
  );
};