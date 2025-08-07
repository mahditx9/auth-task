import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./reducers/user";
const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);

type AppDispatchType = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchFunc = () => AppDispatchType;
