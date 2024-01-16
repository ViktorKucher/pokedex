export type LoginAuthorize = {
  email: string;
  password: string;
};

export type RegistrationAuthorize = {
  name: string;
  password: string;
  email: string;
};

export type User = {
  id:string,
  name:string,
  email?:string,
  social_id?:string,
  picture?:string
};

export type DataResult<T> = T | {message:string}
export type Result<T> = {
  data: DataResult<T>;
  status: number;
};

export type AuthUser = {
  _id?:string,
  name:string,
  email?:string,
  password?:string,
  social_id?:string,
  picture?:string
}

export type FacebookProfile = {
  id: string;
  name: string;
  email?: string;
  picture: {
    data: {
      url: string;
    };
  };
};

export type NextAuthType ={
  id: string;
  email?: string | null;
  name: string | null | undefined;
  image: string | null | undefined;
}
