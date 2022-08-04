import { FC } from "react";

import { SwiperSlide } from "swiper/react";
import { StaffCast } from "../../../../../types/IMovie";
import { Carousel } from "../../../../Carousel/Carousel";
import { PersonItem } from "../../../../PersonItem/PersonItem";

import styles from "./MainRoles.module.scss";

interface MainRolesProps {
  roles: StaffCast[] | undefined;
}

export const MainRoles: FC<MainRolesProps> = ({ roles }) => {
  return (
    <div className={styles.container}>
      <Carousel title={`Актёры (${roles?.length})`}>
        {roles &&
          roles.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <PersonItem item={item} />
              </SwiperSlide>
            );
          })}
      </Carousel>
    </div>
  );
};
