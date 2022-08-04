import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  addFavoriteByUserAndId,
  useAddFavoriteByUserAndIdMutation,
  useDeleteFavoriteByUserAndIdMutation,
} from "@/services/FavouritesService";
import { Data, Movie } from "@/types/IMovie";
import classNames from "classnames";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiBookmark, FiCheck } from "react-icons/fi";
import { RoutesEnum } from "src/constans/routes";
import { auth, firestore } from "../../../firebase/clientApp";
import { ButtonBase } from "../ButtonBase/ButtonBase";
import { Spinner } from "../Spinner/Spinner";
import styles from "./MovieFavorite.module.scss";
export interface MovieFavoriteProps {
  variant?: "text" | "regular";
  className?: string;
  disabled?: boolean;
  item?: Movie;
  favouritesUser?: boolean;
}

export const MovieFavorite: FC<MovieFavoriteProps> = ({
  variant = "text",
  className,
  item,
  disabled,
  favouritesUser,
}) => {
  const {
    push,
    query: { media_type },
  } = useRouter();

  const { filters } = useTypedSelector((state) => state.filtersReducer);
  const [addFavoriteByUserAndId] = useAddFavoriteByUserAndIdMutation();
  const [deleteFavoriteByUserAndId] = useDeleteFavoriteByUserAndIdMutation();
  const [user, isLoading] = useAuthState(auth);

  const handleList = async () => {
    if (!user?.uid) {
      push(RoutesEnum.Login);
    }
    if (favouritesUser) {
      deleteFavoriteByUserAndId({ uid: user?.uid, filters, item });
    } else {
      addFavoriteByUserAndId({
        media_type: String(media_type),
        item,
        filters,
        uid: user?.uid,
      });
    }
  };

  return (
    <>
      <ButtonBase
        ripple
        onClick={handleList}
        className={classNames(
          styles.favorite,
          favouritesUser && styles.active,
          variant === "text" && styles.text,
          variant === "regular" && styles.regular,
          className
        )}
        startIcon={favouritesUser ? <FiCheck /> : <FiBookmark />}
        disabled={disabled}
      >
        Буду смотреть
      </ButtonBase>
    </>
  );
};
