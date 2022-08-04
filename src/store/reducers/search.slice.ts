import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchs: { visible: false, type: "movie", year: null, search: "" },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.searchs.visible = action.payload;
    },
    setType: (state, action) => {
      state.searchs.type = action.payload;
    },
    setYear: (state, action) => {
      state.searchs.year = action.payload;
    },
    setSearch: (state, action) => {
      state.searchs.search = action.payload;
    },
    resetSearchFilter: (state) => {
      state.searchs = initialState.searchs;
    },
  },
});

export const { setVisible, setType, setYear, resetSearchFilter, setSearch } =
  searchSlice.actions;

export const searchReducer = searchSlice.reducer;
