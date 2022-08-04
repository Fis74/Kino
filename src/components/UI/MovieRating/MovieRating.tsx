import { FC, memo } from "react";
import styles from "./MovieRating.module.scss";
import classNames from "classnames";
interface MovieRatingProps {
  vote_average: number;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const MovieRating: FC<MovieRatingProps> = ({
  vote_average,
  className,
}) => {
  const isHighRating = Math.floor(vote_average) > 4 ? styles.green : styles.red;

  return (
    <>
      {vote_average && (
        <span className={classNames(styles.rating, isHighRating, className)}>
          {vote_average.toFixed(1)}
        </span>
      )}
    </>
  );
};
