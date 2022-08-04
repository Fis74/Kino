import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Person from "../../components/screens/Person/Person";
import { getPersonById } from "../../services/KinoService";
import { initStore } from "../../store/store";

const PersonPage: NextPage = () => {
  return (
    <Layout>
      <Person />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const store = initStore();

  await store.dispatch(getPersonById.initiate(Number(params.query.id)));

  return { props: { initialReduxState: store.getState() } };
};

export default PersonPage;
