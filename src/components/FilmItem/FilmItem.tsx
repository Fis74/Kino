import { FC } from "react";
import Ratio from "react-ratio";
import Image from "next/image";
import Link from "next/link";
import styles from "./FilmItem.module.scss";
import { Movie, SortType } from "../../types/IMovie";
import { MovieRating } from "../UI/MovieRating/MovieRating";

interface FilmItemProps {
  item: Movie;
}

export const FilmItem: FC<FilmItemProps> = ({ item }) => {
  const {
    id,
    release_date,
    title,
    original_name,
    poster_path,
    backdrop_path,
    name,
    media_type,
    first_air_date,
    vote_average,
  } = {
    ...item,
  };

  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <Link href={`/${media_type}/${id}`}>
          <Ratio ratio={4 / 3}>
            <a className={styles.imageContainer}>
              {backdrop_path && (
                <Image
                  className={styles.image}
                  layout="fill"
                  src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                  alt={title}
                />
              )}
            </a>
          </Ratio>
        </Link>
        {vote_average > 1 && <MovieRating vote_average={vote_average} />}
      </div>
      <Link href={`/${media_type}/${id}`}>
        <a className={styles.title}>{title || name || original_name}</a>
      </Link>

      <span className={styles.info}>
        {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
        {", "}
        {media_type === "movie" ? "фильм" : "сериал"}
      </span>
    </li>
  );
};
