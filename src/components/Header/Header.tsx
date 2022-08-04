import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import { RoutesEnum } from "../../constans/routes";
import Logo from "../UI/Logo/Logo";
import Burger from "../Burger/Burger";
import { useActions } from "../../hooks/useActions";
import { Dropdown } from "../DropDown/DropDown";
import { useRouter } from "next/router";
import { Search } from "../Search/Search";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { Button } from "../UI/Button/Button";
import { useAuth } from "@/hooks/useAuth";
// eslint-disable-next-line react/display-name
const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    router.push(RoutesEnum.Home);
  };

  const ref = useRef(null);
  const { toggleMenu } = useActions();
  useOnClickOutside(ref, () => toggleMenu(false));
  const [isScrolled, setIsScrolled] = useState(false);
  const { asPath, push } = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 68) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={classNames(
        `${(isScrolled || asPath !== RoutesEnum.Home) && styles.headerBg}`,
        styles.header
      )}
    >
      <div className={classNames("container", styles.container)}>
        <div ref={ref} className={styles.left}>
          <Burger />
          <Logo className={styles.logo} />
          <Dropdown />
        </div>
        <Search />
        {user ? (
          <Button onClick={logout} className={styles.link}>
            Выйти
          </Button>
        ) : (
          <Button
            className={styles.link}
            onClick={() => push(RoutesEnum.Login)}
          >
            Войти
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
