import { FiFilm, FiHome, FiTv, FiHeart } from "react-icons/fi";
import { BiMovie } from "react-icons/bi";
import { useRouter } from "next/router";

import { memo, useEffect, useMemo } from "react";

import classNames from "classnames";
import Link from "next/link";
import styles from "./DropDown.module.scss";
import { RoutesEnum } from "../../constans/routes";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAuth } from "@/hooks/useAuth";

export const Dropdown = () => {
  const { user, loading } = useAuth();
  const items = useMemo(
    () => [
      { icon: <FiHome />, href: RoutesEnum.Home, text: "Главная" },
      { icon: <FiFilm />, href: RoutesEnum.Films, text: "Фильмы" },
      { icon: <FiTv />, href: RoutesEnum.Series, text: "Сериалы" },
    ],
    [user?.uid]
  );
  const protectedRoutes = useMemo(
    () => [
      { icon: <FiHome />, href: RoutesEnum.Home, text: "Главная" },
      { icon: <FiFilm />, href: RoutesEnum.Films, text: "Фильмы" },
      { icon: <FiTv />, href: RoutesEnum.Series, text: "Сериалы" },
      {
        icon: <FiHeart />,
        href: RoutesEnum.Favourites,
        text: "Избранное",
        protected: true,
      },
    ],
    [user?.uid]
  );
  const { events, asPath } = useRouter();

  const { toggleMenu } = useActions();

  useEffect(() => {
    events.on("routeChangeComplete", () => toggleMenu(false));
  }, []);

  const { openedMenu } = useTypedSelector((state) => state.toggleReducer);

  return (
    <div
      className={classNames(styles.dropdown, openedMenu && styles.dropdownOpen)}
    >
      <ul className={classNames("list-reset", styles.list)}>
        {user?.uid
          ? protectedRoutes.map((el, index) => {
              const isCurrentPage = asPath === el.href;

              return (
                <li key={el.text} className={styles.item}>
                  <Link href={el.href}>
                    <a
                      className={classNames(
                        styles.link,
                        isCurrentPage && styles.linkActive
                      )}
                    >
                      {el.icon}
                      {el.text}
                    </a>
                  </Link>
                </li>
              );
            })
          : items.map((el) => {
              const isCurrentPage = asPath === el.href;

              return (
                <li key={el.text} className={styles.item}>
                  <Link href={el.href}>
                    <a
                      className={classNames(
                        styles.link,
                        isCurrentPage && styles.linkActive
                      )}
                    >
                      {el.icon}
                      {el.text}
                    </a>
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
};
