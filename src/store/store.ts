import { toggleReducer } from "./reducers/toggle.slice";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useMemo } from "react";
import { loadReducer } from "./reducers/loadMore.slice";
import { kinoAPI } from "@/services/KinoService";
import { paginationReducer } from "./reducers/pagination.slice";
import { filtersReducer } from "./reducers/filters.slice";
import { searchReducer } from "./reducers/search.slice";
import { favouritesAPI } from "@/services/FavouritesService";

let store: AppStore;

export const initStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      toggleReducer,
      loadReducer,
      paginationReducer,
      filtersReducer,
      searchReducer,
      [kinoAPI.reducerPath]: kinoAPI.reducer,
      [favouritesAPI.reducerPath]: favouritesAPI.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        kinoAPI.middleware,
        favouritesAPI.middleware
      ),
  });
};
export const initializeStore = (preloadedState: PreloadedState<RootState>) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(initStore, { debug: false });
