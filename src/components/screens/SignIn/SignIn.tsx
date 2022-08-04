import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import NextLink from "next/link";
import * as Yup from "yup";
import { RoutesEnum } from "../../../constans/routes";
import { Auth } from "../../Auth/Auth";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import {
  FIREBASE_ERRORS_LOGIN,
  FIREBASE_ERRORS_PASSWORD,
} from "src/firebase/errors";
import { useEffect } from "react";
export const SignIn = () => {
  const { push } = useRouter();
  const { Heading, TextField, Button, Link } = Auth;
  const [signInWithEmailAndPassword, userCred, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const schema = Yup.object().shape({
    email: Yup.string().required("Введите email"),
    password: Yup.string().required("Введите пароль"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = handleSubmit((data) => {
    signInWithEmailAndPassword(data.email, data.password);
  });
  useEffect(() => {
    if (userCred) {
      push(RoutesEnum.Home);
      reset();
    }
  }, [userCred]);
  return (
    <Auth onSubmit={handleLogin}>
      <Heading>Вход</Heading>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <TextField
              type="email"
              label="Email"
              placeholder="Введите email"
              value={value}
              onChange={onChange}
              errorMessage={
                errors.email?.message ||
                FIREBASE_ERRORS_LOGIN[
                  error?.message as keyof typeof FIREBASE_ERRORS_LOGIN
                ]
              }
              error={errors.hasOwnProperty("email")}
            />
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <TextField
              type="password"
              label="Пароль"
              placeholder="Введите пароль"
              value={value}
              onChange={onChange}
              errorMessage={
                errors.password?.message ||
                FIREBASE_ERRORS_PASSWORD[
                  error?.message as keyof typeof FIREBASE_ERRORS_PASSWORD
                ]
              }
              error={errors.hasOwnProperty("password")}
            />
          );
        }}
      />
      <Button onClick={handleLogin}>Войти</Button>
      <Link>
        Нет аккаунта?&nbsp;
        <NextLink href={RoutesEnum.Register}>
          <a>Зарегистрироваться</a>
        </NextLink>
      </Link>
    </Auth>
  );
};
