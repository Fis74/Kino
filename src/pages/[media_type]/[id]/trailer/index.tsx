import { GetServerSideProps, NextPage } from "next";
import Room from "../../../../components/screens/Room/Room";
import {
  getFilmById,
  getMovieTrailerById,
} from "../../../../services/KinoService";
import { initStore } from "../../../../store/store";

const TrailerPage: NextPage = () => {
  return (
    <main className="main">
      <Room />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const store = initStore();
  await store.dispatch(
    getMovieTrailerById.initiate({
      media_type: String(params.query.media_type),
      id: Number(params.query.id),
    })
  );
  return { props: { initialReduxState: store.getState() } };
};

export default TrailerPage;
