import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import styles from "./Chip.module.scss";

interface ChipProps {
  className?: string;
}

export const Chip: FC<PropsWithChildren<ChipProps>> = ({
  className,
  children,
}) => {
  return <div className={classNames(styles.chip, className)}>{children}</div>;
};
