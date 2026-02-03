import { configureStore } from "@reduxjs/toolkit";
import biologyReducer from "./biologySlice";

const store = configureStore({
  reducer: {
    biology: biologyReducer,
  },
});

export default store;
