import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    ratingMin: 1,
    ratingMax: 10,
    genres: 0,
    yearMin: "1960-01-01",
    yearMax: "2022-12-31",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFiterYearsMax: (state, action) => {
      state.filters.yearMax = action.payload;
    },
    setFiterYearsMin: (state, action) => {
      state.filters.yearMin = action.payload;
    },
    setFilterRatingsMin: (state, action) => {
      state.filters.ratingMin = action.payload;
    },
    setFilterRatingsMan: (state, action) => {
      state.filters.ratingMax = action.payload;
    },
    setFilterGenre: (state, action) => {
      state.filters.genres = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setFiterYearsMax,
  setFiterYearsMin,
  setFilterRatingsMin,
  setFilterRatingsMan,
  setFilterGenre,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
