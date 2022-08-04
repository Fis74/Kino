import styles from "./Catalog.module.scss";
import { PropsWithChildren, useEffect } from "react";
import classNames from "classnames";
import { Title } from "../UI/Title/Title";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { Data, Movie } from "@/types/IMovie";
import { Spinner, SpinnerSizes } from "../UI/Spinner/Spinner";
import { MovieItem } from "../MovieItem/MovieItem";
import { FiltersToggle } from "./components/FiltersToggle";
import { Pagination } from "../UI/Pagination/Pagination";
interface ContentProps {
  data: Data | undefined;
  isFetching?: boolean;
  isLoading?: boolean;
  favouritesData?: Data;
}

function Catalog({ children }: PropsWithChildren<{}>) {
  return <div className={styles.catalog}>{children}</div>;
}
module Catalog {
  export const Container = ({ children }: PropsWithChildren<{}>) => {
    return (
      <div className={classNames("container wrapper", styles.container)}>
        {children}
      </div>
    );
  };

  export const Heading = ({ children }: PropsWithChildren<{}>) => {
    return <Title className={styles.title}>{children}</Title>;
  };

  export const Subtitle = ({ children }: PropsWithChildren<{}>) => {
    return (
      <Title className={styles.subtitle} variant="h2">
        {children}
      </Title>
    );
  };

  export const Description = ({ children }: PropsWithChildren<{}>) => {
    return <p className={styles.desc}>{children}</p>;
  };

  export const Loader = () => {
    return (
      <div className={styles.spinner}>
        <Spinner size={SpinnerSizes.medium} />
      </div>
    );
  };

  export const Grid = ({ data, favouritesData }: ContentProps) => {
    return (
      <div className={styles.grid}>
        {data?.results?.map((el) => (
          <MovieItem
            key={el.id}
            favouritesUser={
              favouritesData?.results.length
                ? favouritesData?.results.findIndex(
                    (result) => result.id === el.id
                  ) !== -1
                : false
            }
            item={el}
          />
        ))}
      </div>
    );
  };

  export const Body = ({ children }: PropsWithChildren<{}>) => {
    return (
      <div className={styles.body}>
        <FiltersToggle />
        {children}
      </div>
    );
  };

  export const Content = ({
    data,
    isLoading,
    isFetching,
    favouritesData,
  }: ContentProps) => {
    const { page } = useTypedSelector((state) => state.paginationReducer);
    const { setPage } = useActions();

    useEffect(() => {
      scrollTo(0, 0);
    }, [page]);

    const CatalogContent = (
      <>
        <Catalog.Grid data={data} favouritesData={favouritesData} />
        <Pagination
          page={page}
          setPage={setPage}
          pages={data?.total_pages! <= 500 ? data?.total_pages : 500}
        />
      </>
    );

    return (
      <>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <div className={styles.content}>
            {!data?.results?.length ? (
              <Subtitle>Ничего не найдено!</Subtitle>
            ) : (
              CatalogContent
            )}
          </div>
        )}
      </>
    );
  };
}

export { Catalog };
