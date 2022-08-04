import Layout from "@/components/Layout/Layout";
import Movies from "@/components/screens/Movies/Movies";

import { getMovieData } from "@/services/KinoService";

import { initStore } from "@/store/store";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import React from "react";

const PageMovies: NextPage = () => {
  return (
    <Layout>
      <Movies />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (params) => {
  const store = initStore();
  const state = store.getState();
  const { filters } = state.filtersReducer;
  const { page } = state.paginationReducer;

  await store.dispatch(
    getMovieData.initiate({
      page,
      filters,
      media_type: String(params.query.media_type),
    })
  );

  return { props: { initialReduxState: store.getState() } };
};
export default PageMovies;
