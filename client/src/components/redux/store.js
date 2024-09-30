import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import themeReducer from './theme/themeSlice.js'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({ user: userReducer , theme : themeReducer });

// Persistence configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persisted store
export const persistor = persistStore(store);

