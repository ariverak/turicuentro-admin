import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import { authApi } from "./apis/authApi";
import { cabinApi } from "./apis/cabinApi";
import { reduxPersistConfig } from "../config/reduxPersist";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [cabinApi.reducerPath]: cabinApi.reducer,
  auth: authReducer,
});

const _persistedReducer = persistReducer(reduxPersistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      cabinApi.middleware,
    ),
  devTools: true,
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);