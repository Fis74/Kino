import styles from "./Rating.module.scss";
import classNames from "classnames";
import React, { FC, memo } from "react";

interface RatingProps {
  vote_average: number;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const Rating: FC<RatingProps> = ({ vote_average, className }) => {
  const isHighRating = Math.floor(vote_average) > 4 ? styles.green : styles.red;

  return (
    <>
      {vote_average && (
        <span className={classNames(isHighRating, className)}>
          {vote_average.toFixed(1)}
        </span>
      )}
    </>
  );
};
