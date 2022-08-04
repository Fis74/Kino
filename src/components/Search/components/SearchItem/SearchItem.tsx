import Link from "next/link";
import { FC } from "react";
import styles from "./SearchItem.module.scss";
import Image from "next/image";
import { Rating } from "@/components/Rating/Rating";
import { Movie } from "@/types/IMovie";
import { useTypedSelector } from "@/hooks/useTypedSelector";
interface SearchItemProps {
  item: Movie;
}

export const SearchItem: FC<SearchItemProps> = ({ item }) => {
  const {
    id,
    release_date,
    title,
    original_name,
    poster_path,
    backdrop_path,
    name,
    overview,
    first_air_date,
    vote_average,
  } = item;
  const { searchs } = useTypedSelector((state) => state.searchReducer);
  return (
    <Link href={`/${searchs.type}/${id}`}>
      <a className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imageContainer}>
            <Image
              layout="fill"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          </div>
          <div className={styles.text}>
            <span className={styles.title}>
              {title || name || original_name}
            </span>
            <span className={styles.info}>
              {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
            </span>
          </div>
        </div>
        <Rating className={styles.rating} vote_average={vote_average} />
      </a>
    </Link>
  );
};
