import styles from "./Filter.module.scss";
import classNames from "classnames";
import { FC, PropsWithChildren, useState } from "react";
import { ButtonBase } from "@/components/UI/ButtonBase/ButtonBase";
import { FiChevronDown } from "react-icons/fi";

interface FilterProps {
  name: string;
}

export const Filter: FC<PropsWithChildren<FilterProps>> = ({
  name,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpen = () => setOpen(!open);

  return (
    <div className={classNames(styles.filter, open && styles.filterActive)}>
      <ButtonBase
        type="button"
        className={styles.filterControl}
        aria-label={open ? "Закрыть фильтр" : "Открыть фильтр"}
        aria-expanded={open}
        onClick={handleOpen}
        endIcon={<FiChevronDown />}
      >
        {name}
      </ButtonBase>
      <div className={styles.filterContent} aria-hidden={open}>
        {children}
      </div>
    </div>
  );
};
