import { Button } from "./Button";
import { LoginAuthorize, RegistrationAuthorize } from "@/types/auth";
import { IForm } from "@/types/form";
import { Input } from "./Input";
import { Title } from "./Title";

export const Form = ({
  title,
  handleSubmit,
  handleChange,
  list,
  values,
}: IForm<LoginAuthorize | RegistrationAuthorize>) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Title>{title}</Title>
      {
        list.map((item,index)=>{
            return <Input key={index} name={item.label} placeholder={item.placeholder} type={item.type} onChange={handleChange} value={values[item.label as keyof typeof values]}/>
        })
      }
      <Button type="submit">Submit</Button>
    </form>
  );
};
