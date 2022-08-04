import React, { useState } from "react";
import { ButtonBase } from "../UI/ButtonBase/ButtonBase";
import styles from "./Burger.module.scss";
import { FiMenu, FiX } from "react-icons/fi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const Burger = () => {
  const { toggleMenu } = useActions();
  const { openedMenu } = useTypedSelector((state) => state.toggleReducer);
  const handleOpen = () => toggleMenu(!openedMenu);
  return (
    <ButtonBase className={styles.burger} onClick={handleOpen}>
      {openedMenu ? <FiX /> : <FiMenu />}
    </ButtonBase>
  );
};

export default Burger;
