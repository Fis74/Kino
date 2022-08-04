import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { RoutesEnum } from "../../constans/routes";
import Logo from "../UI/Logo/Logo";
import styles from "./Footer.module.scss";

const Footer = () => {
  const items = [
    { href: RoutesEnum.Films, text: "Фильмы" },
    { href: RoutesEnum.Series, text: "Сериалы" },
  ];
  return (
    <footer className={styles.footer}>
      <div className={classNames("container", styles.container)}>
        <Logo />
        <ul className={classNames("list-reset", styles.list)}>
          {items.map((el) => (
            <li key={el.text} className={styles.item}>
              <Link href={el.href}>
                <a className={styles.link}>{el.text}</a>
              </Link>
            </li>
          ))}
        </ul>
        <span className={styles.copy}>© 2022 kino</span>
      </div>
    </footer>
  );
};

export default Footer;
