import { FormEvent, ChangeEvent } from "react";
import { LoginAuthorize,RegistrationAuthorize } from "./auth";

export type IInput = {
    label: string, 
    type: string, 
    placeholder: string 
}
export type IForm<T> = {
    title:String;
    handleSubmit:(e?: FormEvent<HTMLFormElement> | undefined) => void;
    handleChange:(e: ChangeEvent<any>)=>void;
    values:T;
    list:IInput[];
}