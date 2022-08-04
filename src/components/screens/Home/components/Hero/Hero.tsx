import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useGetNewFilmsQuery } from "../../../../../services/KinoService";
import { Movie } from "../../../../../types/IMovie";
import { Button } from "../../../../UI/Button/Button";
import { Title } from "../../../../UI/Title/Title";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { IMAGE_URL } from "src/constans/api";
const Hero = () => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const { filmsLimit } = useTypedSelector((state) => state.loadReducer);
  const { push } = useRouter();
  const { data } = useGetNewFilmsQuery(filmsLimit);
  useEffect(() => {
    if (data) {
      setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
    }
  }, [data]);

  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <Image
          objectFit="cover"
          layout="fill"
          src={`${IMAGE_URL}${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      </div>

      <div className={classNames("container", styles.container)}>
        <div className={styles.content}>
          <Title variant="h2" className={styles.title}>
            {movie?.title || movie?.name || movie?.original_name}
          </Title>
          <p className={styles.desc}>{movie?.overview}</p>
          <Button
            onClick={() => push(`/${movie?.media_type}/${movie?.id}`)}
            endIcon={<FiArrowRight />}
          >
            Смотреть
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
