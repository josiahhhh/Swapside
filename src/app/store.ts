import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import stockSlice from "./slices/stockSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      stock: stockSlice,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

export const selectStock = () => (state: AppState) => state.stock.info;
export const selectNews = () => (state: AppState) => state.stock.news;
