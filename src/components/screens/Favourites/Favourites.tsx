import { Catalog } from "@/components/Catalog/Catalog";
import { Filters } from "@/components/Filters/Filters";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetFavouritesUserByIdQuery } from "@/services/FavouritesService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RoutesEnum } from "src/constans/routes";
import { auth } from "../../../firebase/clientApp";

export const Favourites = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { filters } = useTypedSelector((state) => state.filtersReducer);
  const { page } = useTypedSelector((state) => state.paginationReducer);
  const { data, isLoading, isFetching } = useGetFavouritesUserByIdQuery({
    uid: user?.uid,
    page,
    filters,
    searchs,
  });

  const { Container, Heading, Description, Body, Content, Subtitle } = Catalog;
  if (!user) {
    router.push(RoutesEnum.Login);
  }
  return (
    <Catalog>
      <Container>
        <Heading>Избранное</Heading>
        <Description>Список избранного кино</Description>
        <Body>
          <Filters />
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <Content
              favouritesData={data}
              data={data}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          )}
        </Body>
      </Container>
    </Catalog>
  );
};
