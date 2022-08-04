import { BaseQuery, Data, Movie, Query } from "@/types/IMovie";
import { fakeBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";

import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  query,
  limit,
  where,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "src/firebase/clientApp";

export const favouritesAPI = createApi({
  reducerPath: "favouritesAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Favourite"],
  endpoints: (build) => ({
    getFavouritesUserById: build.query<any, Query>({
      async queryFn({ uid, page, filters, media_type, searchs }) {
        try {
          const favouritesRef = query(
            collection(firestore, "users", uid!, "myList"),
            // where("media_type", "==", "movie"),
            // where("genre_ids", "array-contains", 35),
            // where("genre_ids", 0 === 0 ? "not-in" : "array-contains", 0),
            // where("vote_average", ">=", 1),
            // where("vote_average", "<=", 10),
            limit(15)
          );
          const querySnapshot = await getDocs(favouritesRef);
          let results: { id: string }[] = [];
          querySnapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: { results } };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Favourite"],
    }),
    addFavoriteByUserAndId: build.mutation<any, Query>({
      async queryFn({ uid, media_type, searchs, item }) {
        try {
          await setDoc(
            doc(firestore, "users", uid!, "myList", item?.id.toString()!),
            {
              ...item,
              media_type,
            }
          );
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Favourite"],
    }),
    deleteFavoriteByUserAndId: build.mutation<any, Query>({
      async queryFn({ uid, media_type, searchs, item }) {
        try {
          await deleteDoc(
            doc(firestore, "users", uid!, "myList", item?.id.toString()!)
          );
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Favourite"],
    }),
  }),
});
export const {
  useGetFavouritesUserByIdQuery,
  useAddFavoriteByUserAndIdMutation,
  useDeleteFavoriteByUserAndIdMutation,
} = favouritesAPI;
export const {
  getFavouritesUserById,
  addFavoriteByUserAndId,
  deleteFavoriteByUserAndId,
} = favouritesAPI.endpoints;
