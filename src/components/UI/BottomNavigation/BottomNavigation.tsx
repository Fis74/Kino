import { useAuth } from "@/hooks/useAuth";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FiFilm, FiHome, FiTv, FiHeart } from "react-icons/fi";
import { RoutesEnum } from "src/constans/routes";
import { ButtonBase } from "../ButtonBase/ButtonBase";
import styles from "./BottomNavigation.module.scss";
export const BottomNavigation = () => {
  const { user, loading } = useAuth();
  const items = [
    { icon: <FiHome />, href: RoutesEnum.Home, text: "Главная" },
    { icon: <FiFilm />, href: RoutesEnum.Films, text: "Фильмы" },
    { icon: <FiTv />, href: RoutesEnum.Series, text: "Сериалы" },
  ];
  const protectedRoutes = [
    { icon: <FiHome />, href: RoutesEnum.Home, text: "Главная" },
    { icon: <FiFilm />, href: RoutesEnum.Films, text: "Фильмы" },
    { icon: <FiTv />, href: RoutesEnum.Series, text: "Сериалы" },
    {
      icon: <FiHeart />,
      href: RoutesEnum.Favourites,
      text: "Избранное",
      protected: true,
    },
  ];

  const { push, asPath } = useRouter();

  return (
    <ul className={classNames("list-reset", styles.list)}>
      {user?.uid
        ? protectedRoutes.map((el) => {
            const isCurrentPage = asPath === el.href;

            return (
              <li key={el.text} className={styles.item}>
                <ButtonBase
                  ripple
                  animationDuration={800}
                  onClick={() => push(el.href)}
                  className={classNames(
                    styles.link,
                    isCurrentPage && styles.linkActive
                  )}
                >
                  {el.icon}
                  {el.text}
                </ButtonBase>
              </li>
            );
          })
        : items.map((el) => {
            const isCurrentPage = asPath === el.href;
            return (
              <li key={el.text} className={styles.item}>
                <ButtonBase
                  ripple
                  animationDuration={800}
                  onClick={() => push(el.href)}
                  className={classNames(
                    styles.link,
                    isCurrentPage && styles.linkActive
                  )}
                >
                  {el.icon}
                  {el.text}
                </ButtonBase>
              </li>
            );
          })}
    </ul>
  );
};
