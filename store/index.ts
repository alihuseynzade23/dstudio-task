import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./todo";


export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(todoApi.middleware),
    devTools: true, 
});
