import { useRouter } from "next/router";
import NextLink from "next/link";
import * as Yup from "yup";
import { Auth } from "../../Auth/Auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoutesEnum } from "../../../constans/routes";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import {
  FIREBASE_ERRORS_LOGIN,
  FIREBASE_ERRORS_PASSWORD,
} from "src/firebase/errors";
export const SignUp = () => {
  const [createUserWithEmailAndPassword, userCred, loading, useError] =
    useCreateUserWithEmailAndPassword(auth);
  const { push } = useRouter();
  const { Heading, Inputs, TextField, Button, Link } = Auth;
  const messageRequired = "Поле обязательно для заполнения";

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Введите корректный email")
      .required(messageRequired),
    password: Yup.string()
      .min(8, "Пароль должен содержать не менее 8 символов")
      .required(messageRequired),
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

  const handleRegister = handleSubmit((data) => {
    createUserWithEmailAndPassword(data.email, data.password);
  });
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
      push(RoutesEnum.Login);
      reset();
    }
  }, [userCred]);

  return (
    <Auth onSubmit={handleRegister}>
      <Heading>Регистрация</Heading>
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
                  useError?.message as keyof typeof FIREBASE_ERRORS_LOGIN
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
                  useError?.message as keyof typeof FIREBASE_ERRORS_PASSWORD
                ]
              }
              error={errors.hasOwnProperty("password")}
            />
          );
        }}
      />

      <Button onClick={handleRegister}>Зарегистрироваться</Button>
      <Link>
        Есть аккаунт?&nbsp;
        <NextLink href={RoutesEnum.Login}>
          <a>Войти</a>
        </NextLink>
      </Link>
    </Auth>
  );
};
