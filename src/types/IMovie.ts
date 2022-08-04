import { CollectionReference } from "firebase/firestore";

export interface Genre {
  id: number;
  name: string;
}
export interface Series {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  genres: Genres[];
  tagline: string;
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
}
export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  genres: Genres[];
  tagline: string;
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
}
export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface Data {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface Genres {
  id: number;
  name: string;
}
export interface StaffAll {
  id: number;
  cast: StaffCast[];
}
export interface StaffCast {
  gender: number;
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string;
  known_for_department: string;
}
export interface Video {
  id: string;
  results: VideoResults[];
}
export interface VideoResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface Person {
  also_known_as: string[];
  biography: string;
  birthday: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
  deathday: null | string;
}
export interface BaseQuery {
  type?: string;
  query?: string;
  limit?: number;
  page?: number;
  id?: number;
  media_type?: string;
  uid?: string;
}
export interface Searchs {
  visible: boolean;
  type: string;
  year: number | null;
  search: string;
}
export interface Filters {
  ratingMin: number;
  ratingMax: number;
  genres: number;
  yearMin: string;
  yearMax: string;
}
export interface Query extends BaseQuery {
  filters: Filters;
  searchs?: Searchs;
  item?: Movie;
}
export interface ReleaseDate {
  gte: string;
  lte: string;
}
export interface Vote {
  gte: number;
  lte: number;
}
export interface SortType {
  popularity: OrderBy;
  release_date: OrderBy;
  revenue: OrderBy;
  primary_release_date: OrderBy;
  original_title: OrderBy;
  vote_average: OrderBy;
  vote_count: OrderBy;
}
export interface OrderBy {
  asc: "asc";
  desc: "desc";
}
