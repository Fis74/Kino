import { GetServerSideProps, NextPage } from "next";
import {
  getFilmById,
  getFilmStaff,
  getMovieById,
  getMovieStaff,
} from "../../../services/KinoService";
import { initStore } from "../../../store/store";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout/Layout";
const Film = dynamic(() => import("../../../components/screens/Film/Film"), {
  ssr: false,
});
const FilmPage: NextPage = () => {
  return (
    <Layout>
      <Film />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (params) => {
  const store = initStore();
  await store.dispatch(
    getMovieById.initiate({
      id: Number(params.query.id),
      media_type: String(params.query.media_type),
    })
  );
  await store.dispatch(
    getMovieStaff.initiate({
      id: Number(params.query.id),
      media_type: String(params.query.media_type),
    })
  );
  return { props: { initialReduxState: store.getState() } };
};
export default FilmPage;
