import * as Yup from "yup";
import {yupEmail, yupName, yupPassword} from "@/functions/yupFunctions";


const name = yupName();

const email = yupEmail();

const password = yupPassword();

export const VALIDATION_LOGIN_SCHEMA = Yup.object({
  email,
  password,
});

export const VALIDATION_REGISTRATION_SCHEMA = Yup.object({
  name,
  email,
  password,
});
