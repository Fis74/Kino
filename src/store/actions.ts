import {
  setFiterYearsMax,
  setFiterYearsMin,
  setFilterRatingsMin,
  setFilterRatingsMan,
  setFilterGenre,
  resetFilters,
} from "./reducers/filters.slice";
import { loadMoreFilms, loadMoreSeries } from "./reducers/loadMore.slice";
import { setPage } from "./reducers/pagination.slice";
import {
  setType,
  setVisible,
  setYear,
  resetSearchFilter,
  setSearch,
} from "./reducers/search.slice";
import { toggleFilters, toggleMenu } from "./reducers/toggle.slice";

export {
  setSearch,
  resetSearchFilter,
  setYear,
  setVisible,
  toggleMenu,
  loadMoreFilms,
  loadMoreSeries,
  setPage,
  setFiterYearsMax,
  setFiterYearsMin,
  setFilterRatingsMin,
  setFilterRatingsMan,
  setFilterGenre,
  resetFilters,
  toggleFilters,
  setType,
};
