import { Button } from "./Button";
import { LoginAuthorize, RegistrationAuthorize } from "@/types/auth";
import { IForm } from "@/types/form";
import { Input } from "./Input";
import { Title } from "./Title";
import { TextMessageError, TextMessageSuccess } from "./Message";

export const Form = ({
  title,
  handleSubmit,
  handleChange,
  list,
  values,
  errors,
}: IForm<LoginAuthorize | RegistrationAuthorize>) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Title>{title}</Title>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <Input
              name={item.label}
              placeholder={item.placeholder}
              type={item.type}
              onChange={handleChange}
              value={values[item.label as keyof typeof values]}
              error={errors[item.label as keyof typeof errors]}
            />
            {errors[item.label as keyof typeof errors] ? (
              <TextMessageError>
                {errors[item.label as keyof typeof errors]}
              </TextMessageError>
            ) : (
              <TextMessageSuccess>Well done!</TextMessageSuccess>
            )}
          </div>
        );
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};
