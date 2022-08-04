import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_URL, IMAGE_URL } from "src/constans/api";
import {
  Data,
  BaseQuery,
  Query,
  Movie,
  Person,
  Series,
  StaffAll,
  Video,
  VideoResults,
} from "../types/IMovie";

export const kinoAPI = createApi({
  reducerPath: "kinoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getNewFilms: build.query<Data, number>({
      query: (limit) =>
        `trending/movie/week?api_key=${API_KEY}&page=${limit}&language=ru-RU`,
    }),
    getNewSeries: build.query<Data, number>({
      query: (limit) =>
        `trending/tv/week?api_key=${API_KEY}&page=${limit}&language=ru-RU`,
    }),
    getFilmById: build.query<Movie, number>({
      query: (id) =>
        `movie/${id}?api_key=${API_KEY}&append_to_response=videos&language=ru-RU`,
    }),
    getFilmStaff: build.query<StaffAll, number>({
      query: (id) =>
        `movie/${id}/credits?api_key=${API_KEY}&append_to_response=videos&language=ru-RU`,
    }),
    getPersonById: build.query<Person, number>({
      query: (id) => `person/${id}?api_key=${API_KEY}&language=ru-RU`,
    }),
    getSeriesById: build.query<Movie, number>({
      query: (id) =>
        `tv/${id}?api_key=${API_KEY}&append_to_response=videos&language=ru-RU`,
    }),
    getSeriesStaff: build.query<StaffAll, number>({
      query: (id) =>
        `tv/${id}/credits?api_key=${API_KEY}&append_to_response=videos&language=ru-RU`,
    }),
    getMovieTrailerById: build.query<Video, BaseQuery>({
      query: ({ media_type, id }) =>
        `${media_type}/${id}/videos?api_key=${API_KEY}`,
    }),
    getMovieById: build.query<Movie, BaseQuery>({
      query: ({ media_type, id }) =>
        `${media_type}/${id}?api_key=${API_KEY}&append_to_response=videos&language=ru-RU`,
    }),
    getMovieStaff: build.query<StaffAll, BaseQuery>({
      query: ({ media_type, id }) =>
        `${media_type}/${id}/credits?api_key=${API_KEY}&language=ru-RU`,
    }),
    getMovieData: build.query<Data, Query>({
      query: ({ media_type, page, filters }) =>
        `/discover/${media_type}?api_key=${API_KEY}&language=ru-RU&page=${page}&primary_release_date.gte=${
          filters.yearMin
        }&with_genres=${
          filters.genres > 0 ? filters.genres : ""
        }&sort_by=vote_count.desc&vote_average.gte=${
          filters.ratingMin
        }&vote_average.lte=${filters.ratingMax}&primary_release_date.lte=${
          filters.yearMax
        }`,
    }),
    getSearchMovie: build.query<Data, Query>({
      query: ({ searchs, query }) =>
        `/search/${searchs?.type}?api_key=${API_KEY}&query=${query}&language=ru-RU`,
    }),
    getMovieByName: build.query<Data, Query>({
      query: ({ media_type, page, query, searchs }) =>
        `/search/${media_type}?api_key=${API_KEY}&query=${query}&page=${page}&language=ru-RU&primary_release_year=${searchs?.year}`,
    }),
  }),
});
export const {
  useGetNewFilmsQuery,
  useGetNewSeriesQuery,
  useGetFilmStaffQuery,
  useGetFilmByIdQuery,
  useGetPersonByIdQuery,
  useGetSeriesByIdQuery,
  useGetSeriesStaffQuery,
  useGetMovieTrailerByIdQuery,
  useGetMovieByIdQuery,
  useGetMovieStaffQuery,
  useGetMovieDataQuery,
  useGetSearchMovieQuery,
  useGetMovieByNameQuery,
} = kinoAPI;
export const {
  getMovieByName,
  getNewFilms,
  getNewSeries,
  getFilmById,
  getFilmStaff,
  getPersonById,
  getSeriesById,
  getSeriesStaff,
  getMovieTrailerById,
  getMovieById,
  getMovieStaff,
  getMovieData,
  getSearchMovie,
} = kinoAPI.endpoints;
