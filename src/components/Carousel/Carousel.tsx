import { FC, PropsWithChildren, useRef } from "react";
import { Swiper, useSwiper } from "swiper/react";
import { Title } from "../UI/Title/Title";
import SwiperClass, { Navigation } from "swiper";
import styles from "./Carousel.module.scss";
import "swiper/css";
import { SliderBtn } from "../UI/SliderBtn/SliderBtn";
const breakpoints = {
  769: {
    slidesPerGroup: 3,
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1025: {
    slidesPerGroup: 4,
    slidesPerView: 4,
    spaceBetween: 30,
  },
  1200: {
    slidesPerGroup: 5,
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

interface CarouselProps {
  title?: string;
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  title,
}) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const navigation = {
    nextEl: navigationNextRef.current,
    prevEl: navigationPrevRef.current,
  };

  // const onSwiper = (swiper: SwiperClass) => {
  //   setTimeout(() => {
  //     // @ts-ignore
  //     swiper.params.navigation = navigationPrevRef.current;
  //     // @ts-ignore
  //     swiper.params.direction = navigationNextRef.current;

  //     // Re-init navigation
  //     swiper.navigation.destroy();
  //     swiper.navigation.init();
  //     swiper.navigation.update();
  //   });
  // };

  return (
    <>
      <div className={styles.top}>
        <Title variant="h2" className={styles.title}>
          {title}
        </Title>
        {/* <div className={styles.btns}>
          <SliderBtn dir="left" ref={navigationPrevRef} />
          <SliderBtn dir="right" ref={navigationNextRef} />
        </div> */}
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={15}
        navigation={true}
        // onSwiper={onSwiper}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
    </>
  );
};
