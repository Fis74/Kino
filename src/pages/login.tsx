import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import { SignIn } from "../components/screens/SignIn/SignIn";

const LoginPage: NextPage = () => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default LoginPage;
