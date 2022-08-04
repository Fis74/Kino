import { Catalog } from "@/components/Catalog/Catalog";
import SearchFilter from "@/components/Search/components/SearchFilter/SearchFilter";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetFavouritesUserByIdQuery } from "@/services/FavouritesService";
import { useGetMovieByNameQuery } from "@/services/KinoService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RoutesEnum } from "src/constans/routes";

export const SearchResults = () => {
  const { user } = useAuth();
  const {
    query: { text, media_type },
  } = useRouter();
  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { filters } = useTypedSelector((state) => state.filtersReducer);

  const { page } = useTypedSelector((state) => state.paginationReducer);
  const { data, isLoading, isFetching } = useGetMovieByNameQuery({
    query: text ? String(text) : "",
    media_type: String(media_type),
    page,
    filters,
    searchs,
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
  return (
    <Catalog>
      <Container>
        <Heading>Результаты поиска по запросу: {text}</Heading>
        <Description>
          Ничего не нашли?&nbsp;{searchs.year}
          <Link
            href={media_type === "movie" ? RoutesEnum.Films : RoutesEnum.Series}
          >
            <a>
              Список всех
              {media_type === "movie" ? " фильмов" : " сериалов"}
            </a>
          </Link>
        </Description>
        <Body>
          <SearchFilter />
          <Content
            data={data}
            favouritesData={favouriteData}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Body>
      </Container>
    </Catalog>
  );
};
