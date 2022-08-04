import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { RoutesEnum } from "../../../../../constans/routes";
import { useActions } from "../../../../../hooks/useActions";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useGetNewSeriesQuery } from "../../../../../services/KinoService";
import { Movie } from "../../../../../types/IMovie";
import { FilmItem } from "../../../../FilmItem/FilmItem";
import { Grid } from "../../../../Grid/Grid";
import { Button } from "../../../../UI/Button/Button";
import { Title } from "../../../../UI/Title/Title";
import styles from "./NewMovies.module.scss";
const NewSeries = () => {
  const { push } = useRouter();
  const { seriesLimit } = useTypedSelector((state) => state.loadReducer);
  const { data, isFetching } = useGetNewSeriesQuery(seriesLimit);
  const { loadMoreSeries } = useActions();
  const condition = data?.results?.length === data?.total_results;
  const serialRef = useRef<null | HTMLElement>(null);
  const handleLoadSeries = () => {
    loadMoreSeries();
    if (serialRef?.current?.offsetTop) {
      scrollTo({ behavior: "smooth", top: serialRef.current.offsetTop });
    }
  };

  return (
    <section ref={serialRef}>
      <div className={classNames("container", styles.container)}>
        <div className={styles.top}>
          <Title variant="h2">Новые Сериалы</Title>
          <Button onClick={() => push(RoutesEnum.Series)}>Смотреть Все</Button>
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
            onClick={handleLoadSeries}
          >
            {isFetching ? "Загрузка..." : "Загрузить еще"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default NewSeries;
