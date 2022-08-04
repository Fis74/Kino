import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { RoutesEnum } from "../../../../../constans/routes";
import { useActions } from "../../../../../hooks/useActions";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useGetNewFilmsQuery } from "../../../../../services/KinoService";
import { Movie } from "../../../../../types/IMovie";
import { FilmItem } from "../../../../FilmItem/FilmItem";
import { Grid } from "../../../../Grid/Grid";
import { Button } from "../../../../UI/Button/Button";
import { Title } from "../../../../UI/Title/Title";
import styles from "./NewMovies.module.scss";
const NewFilms = () => {
  const { push } = useRouter();
  const { filmsLimit } = useTypedSelector((state) => state.loadReducer);
  const { data, isFetching } = useGetNewFilmsQuery(filmsLimit);
  const { loadMoreFilms } = useActions();
  const condition = data?.results?.length === data?.total_results;
  const filmRef = useRef<null | HTMLElement>(null);
  const handleLoadFilms = () => {
    loadMoreFilms();
    if (filmRef?.current?.offsetTop) {
      scrollTo({ behavior: "smooth", top: filmRef.current.offsetTop });
    }
  };
  return (
    <section ref={filmRef}>
      <div className={classNames("container", styles.container)}>
        <div className={styles.top}>
          <Title variant="h2">Новые Фильмы</Title>
          <Button onClick={() => push(RoutesEnum.Films)}>Смотреть Все</Button>
        </div>
        <Grid>
          {data?.results?.map((el: Movie) => (
            <FilmItem key={el.id} item={el} />
          ))}
        </Grid>
        {!condition && (
          <Button
            disabled={isFetching}
            className={styles.btn}
            onClick={handleLoadFilms}
          >
            {isFetching ? "Загрузка..." : "Загрузить еще"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default NewFilms;
