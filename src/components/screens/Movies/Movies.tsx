import { Catalog } from "@/components/Catalog/Catalog";
import { Filters } from "@/components/Filters/Filters";
import { useAuth } from "@/hooks/useAuth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetFavouritesUserByIdQuery } from "@/services/FavouritesService";
import { useGetMovieDataQuery } from "@/services/KinoService";
import { useRouter } from "next/router";
import React from "react";
import NotFound from "../NotFound/NotFound";

const Movies = () => {
  const {
    query: { media_type },
  } = useRouter();

  const { user } = useAuth();

  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { filters } = useTypedSelector((state) => state.filtersReducer);
  const { page } = useTypedSelector((state) => state.paginationReducer);
  const { data, isLoading, isFetching } = useGetMovieDataQuery({
    page,
    filters,
    media_type: String(media_type),
  });
  const {
    data: favouriteData,
    isLoading: favouriteIsLoading,
    isFetching: favouriteIsFetching,
  } = useGetFavouritesUserByIdQuery({
    uid: user?.uid,
    page,
    filters,
    searchs,
  });
  const { Container, Heading, Description, Body, Content } = Catalog;
  if (!data) {
    return <NotFound />;
  }
  return (
    <Catalog>
      <Container>
        <Heading>
          {media_type === "movie" ? "Все фильмы" : "Все сериалы"}
        </Heading>
        <Description>
          Подборка {media_type === "movie" ? "фильмов" : "сериалов"} всего мира
        </Description>
        <Body>
          <Filters />
          <Content
            favouritesData={favouriteData}
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Body>
      </Container>
    </Catalog>
  );
};

export default Movies;
