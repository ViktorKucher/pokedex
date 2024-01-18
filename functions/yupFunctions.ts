import * as Yup from "yup";
import {MIN_LENGTH_YUP_NAME, MIN_LENGTH_YUP_PASSWORD} from "@/constants/default";

export const yupName = () =>{
    return Yup.string()
        .min(MIN_LENGTH_YUP_NAME, "Username must be 6 characters long")
        .required("Username is required")
}

export const yupEmail = () =>{
    return Yup.string()
        .email("Invalid email format")
        .required("Mail is required")
}

export const yupPassword = () =>{
    return Yup.string()
        .min(MIN_LENGTH_YUP_PASSWORD, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("Password is required")
}
