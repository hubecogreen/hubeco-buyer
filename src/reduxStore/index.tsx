// src/store/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./slices/userSlice";
import masterDataReducer from "./slices/masterDataSlice";
import counterReducer from "./slices/counterSlice";
// assuming you have a combined rootReducer

const persistConfig = {
  key: "root",
  storage,
};

// categories/catetime are re-fetched on demand (see productCategoryTreeCache.ts)
// and must never survive a reload as stale data, so they're excluded here.
const masterDataPersistConfig = {
  key: "masterData",
  storage,
  blacklist: ["categories", "catetime"],
};

const rootReducer = combineReducers({
  user: userReducer,
  masterData: persistReducer(masterDataPersistConfig, masterDataReducer),
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
