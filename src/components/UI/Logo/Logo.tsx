import Link from "next/link";
import { FC, memo } from "react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Logo.module.scss";
interface LogoProps {
  className?: string;
}

// eslint-disable-next-line react/display-name
const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <>
      <Link href="/">
        <a className={classNames(styles.logo, className)}>
          <Image layout="fill" src="/logo.svg" alt="kino" />
        </a>
      </Link>
    </>
  );
};

export default Logo;
