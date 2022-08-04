import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { RoutesEnum } from "../../../constans/routes";
import { Button } from "../../UI/Button/Button";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  const { push } = useRouter();
  return (
    <section className={styles.section}>
      <div className={classNames("container", styles.container)}>
        <h1 className={styles.title}>404. Страница не найдена</h1>
        <p className={styles.desc}>
          Возможно, она была перемещена, или вы просто неверно указали адрес
          страницы.
        </p>
        <Button onClick={() => push(RoutesEnum.Home)} className={styles.link}>
          Вернуться на главную
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
