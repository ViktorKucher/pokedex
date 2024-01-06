"use client";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { Form } from "./ui/Form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SocialButtons } from "./SocialButtons";
import { Button } from "./ui/Button";
import Link from "next/link";
import { VALIDATION_REGISTRATION_SCHEMA } from "@/constants/yupSchemas";
import { LIST_REGISTRATION_INPUTS } from "@/constants/inputs";

export const SingUP = () => {
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
      email: "",
    },
    onSubmit: async (values) => {
      const res = await signIn("registration", {
        username: values.username,
        password: values.password,
        email: values.email,
      });
    },
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
