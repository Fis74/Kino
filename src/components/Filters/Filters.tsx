import { getCurrentYear } from "@/helpers/getCurrentYear/getCurrentYear";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Device } from "../Device/Device";
import { Button } from "../UI/Button/Button";
import { ButtonBase } from "../UI/ButtonBase/ButtonBase";
import { Radio } from "../UI/Radio/Radio";
import { Select } from "../UI/Select/Select";
import { Slider } from "../UI/Slider/Slider";
import { Title } from "../UI/Title/Title";
import { Filter } from "./components/Filter/Filter";
import { FiltersChoices } from "./components/FiltersChoices/FiltersChoices";
import styles from "./Filters.module.scss";
export const Filters = () => {
  const {
    query: { media_type },
  } = useRouter();
  const {
    setPage,
    setFiterYearsMax,
    setFiterYearsMin,
    setFilterRatingsMin,
    setFilterRatingsMan,
    setFilterGenre,
    resetFilters,
    toggleFilters,
  } = useActions();
  const { openedFilters } = useTypedSelector((state) => state.toggleReducer);
  const genresSeries = [
    {
      label: "Все жанры",
      value: 0,
    },
    {
      value: 10759,
      label: "Боевик и Приключения",
    },
    {
      value: 37,
      label: "Вестерн",
    },
    {
      value: 10768,
      label: "Война и Политика",
    },
    {
      value: 9648,
      label: "Детектив",
    },
    {
      value: 10762,
      label: "Детский",
    },
    {
      value: 99,
      label: "Документальный",
    },
    {
      value: 18,
      label: "Драма",
    },
    {
      value: 35,
      label: "Комедия",
    },
    {
      value: 80,
      label: "Криминал",
    },
    {
      value: 16,
      label: "Мультфильм",
    },
    {
      value: 10766,
      label: "Мыльная опера",
    },
    {
      value: 10763,
      label: "Новости",
    },
    {
      value: 10765,
      label: "НФ и Фэнтези",
    },
    {
      value: 10764,
      label: "Реалити-шоу",
    },
    {
      value: 10751,
      label: "Семейный",
    },
    {
      value: 10767,
      label: "Ток-шоу",
    },
  ];
  const genresFilm = [
    {
      label: "Все жанры",
      value: 0,
    },
    {
      value: 28,
      label: "Боевик",
    },
    {
      value: 37,
      label: "Вестерн",
    },
    {
      value: 10752,
      label: "Военный",
    },

    {
      value: 9648,
      label: "Детектив",
    },
    {
      value: 99,
      label: "Документальный",
    },
    {
      value: 18,
      label: "Драма",
    },
    {
      value: 36,
      label: "История",
    },
    {
      value: 35,
      label: "Комедия",
    },
    {
      value: 80,
      label: "Криминал",
    },
    {
      value: 10749,
      label: "Мелодрама",
    },
    {
      value: 10402,
      label: "Музыка",
    },
    {
      value: 16,
      label: "Мультфильм",
    },
    {
      value: 12,
      label: "Приключения",
    },
    {
      value: 10751,
      label: "Семейный",
    },
    {
      value: 10770,
      label: "Телевизионный фильм",
    },
    {
      value: 53,
      label: "Триллер",
    },
    {
      value: 27,
      label: "Ужасы",
    },
    {
      value: 878,
      label: "Фантастика",
    },
    {
      value: 14,
      label: "Фэнтези",
    },
  ];

  const getYear = useCallback(() => getCurrentYear(), []);
  const handleClose = () => {
    toggleFilters(false);
  };

  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: {
      genres: media_type === "movie" ? genresFilm[0] : genresSeries[0],
      rating: [1, 10],
      year: [1960, getYear()],
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { rating, year, genres } = data;
    setPage(1);
    setFiterYearsMin(`${year[0]}-01-01`);
    setFiterYearsMax(`${year[1]}-12-31`);
    setFilterRatingsMin(rating[0]);
    setFilterRatingsMan(rating[1]);
    setFilterGenre(genres.value);
    handleClose();
  });

  const handleReset = () => {
    resetFilters();
    reset();
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <form
      action="#"
      onSubmit={onSubmit}
      noValidate
      className={classNames(styles.filters, openedFilters && styles.opened)}
    >
      <div className={styles.top}>
        <Button type="button" onClick={handleReset} variant="sm">
          Сбросить
        </Button>
        <Title variant="h3" className={styles.title}>
          Фильтры
        </Title>
        <ButtonBase
          type="button"
          className={styles.close}
          onClick={handleClose}
        >
          <FiX />
        </ButtonBase>
      </div>
      <div className={styles.container}>
        <FiltersChoices choices={getValues()} />
        <div className={styles.content}>
          <Filter name="Рейтинг">
            <Controller
              name="rating"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Slider
                    min={1}
                    max={10}
                    values={value}
                    onChange={onChange}
                    step={1}
                  />
                );
              }}
            />
          </Filter>
          <Filter name="Года производства">
            <Controller
              name="year"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Slider
                    min={1887}
                    max={getYear()}
                    values={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </Filter>
          <Filter name="Жанры">
            <Controller
              name="genres"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    value={value}
                    onChange={onChange}
                    name="genres"
                    options={media_type === "movie" ? genresFilm : genresSeries}
                  />
                );
              }}
            />
          </Filter>
        </div>
      </div>
      <div className={styles.btns}>
        <Button className={styles.btn}>Применить</Button>
        <Device desktop>
          <Button
            type="button"
            className={styles.btn}
            onClick={handleReset}
            variant="stroke"
          >
            Сбросить
          </Button>
        </Device>
        <Device mobile>
          <Button
            type="button"
            className={styles.btn}
            onClick={handleClose}
            variant="stroke"
          >
            Закрыть
          </Button>
        </Device>
      </div>
    </form>
  );
};
