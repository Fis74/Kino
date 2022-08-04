import classNames from "classnames";
import { useRouter } from "next/router";
import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import {
  useGetFilmByIdQuery,
  useGetFilmStaffQuery,
  useGetMovieByIdQuery,
  useGetMovieStaffQuery,
} from "../../../services/KinoService";

import { Title } from "../../UI/Title/Title";
import styles from "./Film.module.scss";
import Image from "next/image";
import { Button } from "../../UI/Button/Button";
import { FiPlay } from "react-icons/fi";
import { MovieRating } from "../../UI/MovieRating/MovieRating";
import { Info } from "../../Info/Info";
import { Tabs } from "../../UI/Tabs/Tabs";
import { MainRoles } from "./components/MainRoles/MainRoles";
import { BackBtn } from "@/components/UI/BackBtn/BackBtn";
import { MovieFavorite } from "@/components/UI/MovieFavorite/MovieFavorite";
import { useGetFavouritesUserByIdQuery } from "@/services/FavouritesService";
import { useAuth } from "@/hooks/useAuth";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const Film = () => {
  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { filters } = useTypedSelector((state) => state.filtersReducer);
  const [value, setValue] = useState(false);
  const { page } = useTypedSelector((state) => state.paginationReducer);
  const { user } = useAuth();
  const {
    push,
    query: { id, media_type },
  } = useRouter();

  const { data, isLoading, isError } = useGetMovieByIdQuery({
    id: Number(id),
    media_type: String(media_type),
  });
  const {
    data: staffData,
    isLoading: staffLoading,
    isError: staffError,
  } = useGetMovieStaffQuery({
    id: Number(id),
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
  useEffect(
    () =>
      setValue(
        favouriteData?.results.length
          ? favouriteData?.results.findIndex(
              (result: { id: number | undefined }) => result.id === data?.id
            ) !== -1
          : false
      ),
    [favouriteData]
  );
  const {
    id: filmId,
    release_date,
    title,
    original_name,
    poster_path,
    backdrop_path,
    name,
    first_air_date,
    vote_average,
    overview,
    production_countries,
    production_companies,
    genres,
    tagline,
    budget,
  } = {
    ...data,
  };
  const items = useMemo(
    () => [
      {
        caption: "Страна",
        value: production_countries?.map((el, idx) => (
          <Fragment key={idx}>
            {idx ? ", " : ""}
            {el.name}
          </Fragment>
        )),
        condition: production_countries?.length,
      },
      {
        caption: "Студия",
        value: production_companies?.map((el, idx) => (
          <Fragment key={idx}>
            {idx ? ", " : ""}
            {el.name}
          </Fragment>
        )),
        condition: production_companies?.length,
      },
      {
        caption: "Жанр",
        value: genres?.map((el, idx) => (
          <Fragment key={idx}>
            {idx ? ", " : ""}
            {el.name}
          </Fragment>
        )),
        condition: genres?.length,
      },
      {
        caption: "Бюджет",
        value: budget,
        condition: budget,
      },

      {
        caption: "Премьера в мире",
        value: release_date,
        condition: release_date,
      },
    ],
    [budget, release_date, genres, production_companies, production_countries]
  );
  const tabs = useMemo(
    () => [
      {
        txt: "Описание",
        content: <p className={styles.desc}>{overview}</p>,
        condition: overview?.length,
      },
      {
        txt: "Актёры",
        content: <MainRoles roles={staffData?.cast} />,
        condition: staffData?.cast?.length,
      },
    ],
    [overview, staffData]
  );

  return (
    <section className={styles.section}>
      <div className={classNames("container wrapper", styles.container)}>
        <div className={styles.top}>
          <BackBtn />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imageContainer}>
              <Image
                layout="fill"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
              />
            </div>
            {vote_average && <MovieRating vote_average={vote_average} />}
          </div>
          <div className={styles.right}>
            <Title className={styles.title} variant="h1">
              {title || name || original_name}
              {", "}
              {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
            </Title>
            <div className={styles.btns}>
              <Button
                onClick={() => push(`/${media_type}/${id}/trailer`)}
                className={styles.btn}
                variant="regular"
                disabled={isError}
                startIcon={<FiPlay />}
              >
                Смотреть
              </Button>
              <MovieFavorite
                item={data}
                className={styles.btn}
                variant="regular"
                disabled={isError}
                favouritesUser={value}
              />
            </div>
            {items && <Info items={items} />}
          </div>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </section>
  );
};

export default Film;
