import styles from "./FiltersChoices.module.scss";
import { FieldValues } from "react-hook-form";
import { FC } from "react";
import { Chip } from "@/components/UI/Chip/Chip";
type IFilter = {
  sort: string;
  genres: {
    label: string;
    value: string;
  };
  rating: number[];
  year: number[];
  yearSearch: number | number[];
  search: string;
};

interface FiltersChoicesProps {
  choices: FieldValues | IFilter;
}

export const FiltersChoices: FC<FiltersChoicesProps> = ({ choices }) => {
  const { genres, rating, year, yearSearch, search } = choices;

  return (
    <div className={styles.choices}>
      {search && <Chip className={styles.choice}>Название: {search}</Chip>}
      {yearSearch && (
        <Chip className={styles.choice}>Год производства: {yearSearch}</Chip>
      )}
      {rating && (
        <Chip className={styles.choice}>
          Рейтинг: {rating[0]} - {rating[1]}
        </Chip>
      )}
      {year && (
        <Chip className={styles.choice}>
          Года производства: {year[0]} - {year[1]}
        </Chip>
      )}
      {genres && <Chip className={styles.choice}>Жанр: {genres.label}</Chip>}
    </div>
  );
};
