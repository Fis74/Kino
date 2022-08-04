import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { auth } from "src/firebase/clientApp";
import Layout from "../components/Layout/Layout";
import Home from "../components/screens/Home/Home";
import { getNewFilms, getNewSeries } from "../services/KinoService";
import { initStore } from "../store/store";

const Index: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const store = initStore();
  const state = store.getState();
  const { filmsLimit, seriesLimit } = state.loadReducer;

  await store.dispatch(getNewFilms.initiate(filmsLimit));
  await store.dispatch(getNewSeries.initiate(seriesLimit));

  return { props: { initialReduxState: store.getState() } };
};

export default Index;
