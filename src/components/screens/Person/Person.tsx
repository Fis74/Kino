import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { useGetPersonByIdQuery } from "../../../services/KinoService";
import { convertTimestampToDate } from "../../../helpers/convertTimestampToDate/convertTimestampToDate";
import { Info } from "../../Info/Info";
import { BackBtn } from "../../UI/BackBtn/BackBtn";
import { Title } from "../../UI/Title/Title";
import styles from "./Person.module.scss";
import Image from "next/image";
const Person = () => {
  const {
    query: { id },
  } = useRouter();
  const { data } = useGetPersonByIdQuery(Number(id));

  const {
    biography,
    birthday,
    also_known_as,
    gender,
    id: personId,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
    deathday,
  } = { ...data };
  const items = useMemo(
    () => [
      {
        caption: "Карьера",
        value: known_for_department,
        condition: known_for_department,
      },
      {
        caption: "Биография",
        value: biography,
        condition: biography,
      },
      {
        caption: "Дата рождения",
        value: convertTimestampToDate(birthday, "D MMMM YYYY"),
        condition: birthday,
      },
      {
        caption: "Дата смерти",
        value: convertTimestampToDate(deathday, "D MMMM YYYY"),
        condition: deathday,
      },
      {
        caption: "Место рождения",
        value: place_of_birth,
        condition: place_of_birth,
      },
    ],
    [biography, birthday, deathday, known_for_department, place_of_birth]
  );

  const rusName = also_known_as?.filter((name: string) =>
    /[а-яА-Я][Ии]/g.test(name)
  );

  return (
    <section className={styles.section}>
      <div className={classNames("container wrapper", styles.container)}>
        <div className={styles.top}>
          <BackBtn />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imageContainer}>
              <Image
                layout="fill"
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
              />
            </div>
          </div>
          <div className={styles.right}>
            <Title className={styles.title} variant="h1">
              {rusName?.length ? rusName[0] : name}
            </Title>
            <span className={styles.originalTitle}>{name}</span>
            <Title variant="h2" className={styles.subtitle}>
              О персоне
            </Title>
            <Info items={items} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Person;
