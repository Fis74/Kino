import { Movie } from "@/types/IMovie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/firebase/clientApp";
import { Rating } from "../Rating/Rating";
import { MovieFavorite } from "../UI/MovieFavorite/MovieFavorite";
import { MovieRating } from "../UI/MovieRating/MovieRating";
import styles from "./MovieItem.module.scss";

interface MovieItemProps {
  item: Movie;
  favouritesUser?: boolean;
}

export const MovieItem: FC<MovieItemProps> = ({ item, favouritesUser }) => {
  const {
    push,
    query: { media_type },
  } = useRouter();
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
  } = {
    ...item,
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={`/${media_type}/${id}`}>
          <a className={styles.imageContainer}>
            <Image
              layout="fill"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          </a>
        </Link>
        <div className={styles.text}>
          <Link href={`/${media_type}/${id}`}>
            <a className={styles.title}> {title || name || original_name}</a>
          </Link>
          <span className={styles.info}>
            {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
          </span>
          <Link href={`/${media_type}/${id}`}>
            <a className={styles.desc}>{overview}</a>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        {vote_average && (
          <Rating className={styles.rating} vote_average={vote_average} />
        )}

        <MovieFavorite
          favouritesUser={favouritesUser}
          variant="text"
          item={item}
        />
      </div>
    </div>
  );
};
