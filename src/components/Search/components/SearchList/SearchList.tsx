import { Button } from "@/components/UI/Button/Button";
import { ButtonBase } from "@/components/UI/ButtonBase/ButtonBase";
import { Spinner, SpinnerSizes } from "@/components/UI/Spinner/Spinner";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetSearchMovieQuery } from "@/services/KinoService";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { SearchItem } from "../SearchItem/SearchItem";
import styles from "./SearchList.module.scss";

interface SearchListProps {
  value: string;
}

export const SearchList: FC<SearchListProps> = ({ value }) => {
  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { filters } = useTypedSelector((state) => state.filtersReducer);
  const { setType } = useActions();
  const { data, isFetching, refetch } = useGetSearchMovieQuery({
    searchs,
    query: value,
    filters,
  });
  const { results } = { ...data };

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.btns}>
          <Button
            type="button"
            variant="sm"
            onClick={() => setType("movie")}
            className={classNames(
              styles.btn,
              searchs.type === "movie" && styles.active
            )}
          >
            Фильмы
          </Button>
          <Button
            type="button"
            variant="sm"
            onClick={() => setType("tv")}
            className={classNames(
              styles.btn,
              searchs.type === "tv" && styles.active
            )}
          >
            Сериалы
          </Button>
        </div>
      </div>
      <>
        {results?.length ? (
          <>
            {!isFetching ? (
              <>
                <ul className={classNames("list-reset", styles.list)}>
                  {results.map((item) => (
                    <SearchItem key={item.id} item={item} />
                  ))}
                </ul>
              </>
            ) : (
              <div className={styles.loader}>
                <Spinner variant="dark" size={SpinnerSizes.medium} />
              </div>
            )}
          </>
        ) : (
          <p className={styles.desc}>По вашему запросу ничего не найдено</p>
        )}
      </>
      <ButtonBase ripple className={styles.more}>
        Показать все
      </ButtonBase>
    </div>
  );
};
