import Layout from "@/components/Layout/Layout";
import { Favourites } from "@/components/screens/Favourites/Favourites";
import nookies from "nookies";
import { getFavouritesUserById } from "@/services/FavouritesService";
import { initStore } from "@/store/store";
import { GetServerSideProps, NextPage } from "next";
import { RoutesEnum } from "../constans/routes";

const FavouritesPage: NextPage = () => {
  return (
    <Layout>
      <Favourites />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const store = initStore();
  const state = store.getState();
  const { filters } = state.filtersReducer;
  const { searchs } = state.searchReducer;
  try {
    const cookies = nookies.get(context);

    const endPoint = "https://jwtecho.pixegami.io";
    const request = {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    };
    const response = await fetch(endPoint, request);
    const { token_claims } = await response.json();

    await store.dispatch(
      getFavouritesUserById.initiate({
        uid: token_claims.user_id,
        filters,
        searchs,
      })
    );
  } catch (error) {
    context.res.writeHead(302, { Location: RoutesEnum.Login });
    context.res.end();
    return { props: {} };
  }
  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
};

export default FavouritesPage;
