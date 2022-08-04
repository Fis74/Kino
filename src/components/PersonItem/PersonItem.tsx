import { FC } from "react";
import Image from "next/image";
import Ratio from "react-ratio";
import styles from "./PersonItem.module.scss";
import Link from "next/link";
import { StaffCast } from "../../types/IMovie";

interface PersonItemProps {
  item: StaffCast;
}

export const PersonItem: FC<PersonItemProps> = ({ item }) => {
  const { name, character, profile_path, id } = item;

  return (
    <div className={styles.item}>
      <Link href={`/name/${id}`}>
        <Ratio ratio={2 / 3}>
          <a className={styles.image}>
            <Image
              layout="fill"
              alt={name}
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            />
          </a>
        </Ratio>
      </Link>
      <Link href={`/name/${id}`}>
        <a className={styles.title}>{name}</a>
      </Link>
      <span className={styles.role}>{character}</span>
    </div>
  );
};
