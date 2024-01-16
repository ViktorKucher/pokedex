"use client";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { Form } from "./ui/Form";
import { SocialButtons } from "./SocialButtons";
import { Button } from "./ui/Button";
import Link from "next/link";
import { VALIDATION_REGISTRATION_SCHEMA } from "@/constants/yupSchemas";
import { LIST_REGISTRATION_INPUTS } from "@/constants/inputs";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";
import { EMPTY_STRING } from "@/constants/default";
import { toast } from "sonner";

export const Registration = () => {
  const navigation = useSessionRedirect();
  navigation("/pokedex");
  const formik = useFormik({
    initialValues: {
      name: EMPTY_STRING,
      password: EMPTY_STRING,
      email: EMPTY_STRING,
    },
    onSubmit: async (values) =>
      await signIn("registration", {
        name: values.name,
        password: values.password,
        email: values.email,
        redirect:false
      }).then(res=>{
        res?.error && toast.error(res.error)
      }),
    validationSchema: VALIDATION_REGISTRATION_SCHEMA,
  });

  return (
    <div className="flex flex-col m-0 gap-2">
      <Form
        title={"Registration"}
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        values={formik.values}
        list={LIST_REGISTRATION_INPUTS}
        errors={formik.errors}
      />
      <span className="text-center">or</span>
      <Button>
        <Link href="/">Login</Link>
      </Button>
      <SocialButtons />
    </div>
  );
};
