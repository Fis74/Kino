import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetMovieTrailerByIdQuery } from "../../../services/KinoService";
import styles from "./Room.module.scss";
import ReactPlayer from "react-player/lazy";
import { RoomHeader } from "./RoomHeader/RoomHeader";

const Room = () => {
  const {
    query: { id, media_type },
  } = useRouter();
  const { data } = useGetMovieTrailerByIdQuery({
    media_type: String(media_type),
    id: Number(id),
  });

  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data) {
      const index = data.results.find((element) => element.type === "Trailer");
      if (index) {
        setTrailer(index?.key);
      }
    }
  }, [data, id, media_type]);

  return (
    <section className={styles.content}>
      <RoomHeader title="Назад" />
      <div className={styles.videoContainer}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100vw"
          height="100vh"
          playing
          controls={true}
          style={{ overflow: "hidden" }}
          muted={true}
        />
      </div>
    </section>
  );
};

export default Room;
