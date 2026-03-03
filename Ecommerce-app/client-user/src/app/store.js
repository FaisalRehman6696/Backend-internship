import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { cardReducer } from "../counter/cardSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "card",
  storage,
};
const persistedReducer = persistReducer(persistConfig, cardReducer);

export const store = configureStore({
  reducer: {
    card: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
