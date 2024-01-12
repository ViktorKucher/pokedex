import * as Yup from "yup";

const name = Yup.string()
  .min(6, "Username must be 6 characters long")
  .required("Username is required");

const email = Yup.string()
  .email("Invalid email format")
  .required("Mail is required");

const password = Yup.string()
  .min(8, "Password must be 8 characters long")
  .matches(/[0-9]/, "Password requires a number")
  .matches(/[a-z]/, "Password requires a lowercase letter")
  .matches(/[A-Z]/, "Password requires an uppercase letter")
  .matches(/[^\w]/, "Password requires a symbol")
  .required("Password is required");

export const VALIDATION_lOGIN_SCHEMA = Yup.object({
  email,
  password,
});

export const VALIDATION_REGISTRATION_SCHEMA = Yup.object({
  name,
  email,
  password,
});
