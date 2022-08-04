import Layout from "@/components/Layout/Layout";
import { SearchResults } from "@/components/screens/SearchResults/SearchResults";
import { getMovieByName } from "@/services/KinoService";
import { initStore } from "@/store/store";
import { GetServerSideProps, NextPage } from "next";

const SearchPage: NextPage = () => {
  return (
    <Layout>
      <SearchResults />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const store = initStore();
  const state = store.getState();
  const { filters } = state.filtersReducer;
  const { page } = state.paginationReducer;
  const { searchs } = state.searchReducer;
  await store.dispatch(
    getMovieByName.initiate({
      page,
      filters,
      searchs,
    })
  );

  return { props: { initialReduxState: store.getState() } };
};

export default SearchPage;
