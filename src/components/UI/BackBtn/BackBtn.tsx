import classNames from "classnames";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, memo } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { ButtonBase } from "../ButtonBase/ButtonBase";
import styles from "./BackBtn.module.scss";
interface BackBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "icon";
}

export const BackBtn = memo<BackBtnProps>(
  ({ className, variant, ...props }) => {
    const router = useRouter();
    const handleBack = () => router.back();

    return (
      <ButtonBase
        className={classNames(
          styles.back,
          variant === "icon" && styles.icon,
          className
        )}
        onClick={handleBack}
        startIcon={variant === "icon" ? null : <FiChevronLeft />}
        {...props}
      >
        {variant === "icon" ? (
          <FiChevronLeft className={classNames(className)} />
        ) : (
          "Назад"
        )}
      </ButtonBase>
    );
  }
);

BackBtn.displayName = "BackBtn";
