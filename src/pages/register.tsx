import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import { SignUp } from "../components/screens/SignUp/SignUp";

const RegisterPage: NextPage = () => {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
};

export default RegisterPage;
