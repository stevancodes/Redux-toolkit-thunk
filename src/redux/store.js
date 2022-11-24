import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { postsSlice } from "./slice";

const store = configureStore({
  reducer: {
    [postsSlice.name]: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
});

export default store;
