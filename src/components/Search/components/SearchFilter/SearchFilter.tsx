import { Device } from "@/components/Device";
import { Filter } from "@/components/Filters/components/Filter/Filter";
import { FiltersChoices } from "@/components/Filters/components/FiltersChoices/FiltersChoices";
import { Button } from "@/components/UI/Button/Button";
import { ButtonBase } from "@/components/UI/ButtonBase/ButtonBase";
import { Slider } from "@/components/UI/Slider/Slider";
import { TextField } from "@/components/UI/TextField/TextField";
import { Title } from "@/components/UI/Title/Title";
import { getCurrentYear } from "@/helpers/getCurrentYear/getCurrentYear";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import styles from "./SearchFilter.module.scss";
const SearchFilter = () => {
  const router = useRouter();
  const { setPage, setYear, resetSearchFilter, toggleFilters, setSearch } =
    useActions();
  const { openedFilters } = useTypedSelector((state) => state.toggleReducer);
  const handleReset = () => {
    resetSearchFilter();
    reset();
    router.push(`/${router.query.media_type}/search`);
  };
  const handleClose = () => {
    toggleFilters(false);
  };
  const getYear = useCallback(() => getCurrentYear(), []);
  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: {
      yearSearch: [2022],
      search: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { search, yearSearch } = data;
    setPage(1);
    setYear(yearSearch[0]);
    router.push(
      `/${router.query.media_type}/search?text=${search}`,
      undefined,
      { shallow: true }
    );
  });

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
          <Filter name="Название">
            <Controller
              name="search"
              control={control}
              render={({ field: { value, onChange } }) => {
                return <TextField value={value} onChange={onChange} />;
              }}
            />
          </Filter>
          <Filter name="Год производства">
            <Controller
              name="yearSearch"
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

export default SearchFilter;
