import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filmsLimit: 1,
  seriesLimit: 1,
};

export const loadSlice = createSlice({
  name: "loadMore",
  initialState,
  reducers: {
    loadMoreFilms: (state) => {
      state.filmsLimit += 1;
    },
    loadMoreSeries: (state) => {
      state.seriesLimit += 1;
    },
  },
});

export const { loadMoreFilms, loadMoreSeries } = loadSlice.actions;

export const loadReducer = loadSlice.reducer;
