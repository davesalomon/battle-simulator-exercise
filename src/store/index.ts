import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "../components/scenes/battle/slice";
import optionReducer from "../components/sound-player/slice";

export const options = {
  reducer: {
    battle: battleReducer,
    options: optionReducer,
  },
};

const store = configureStore(options);

export default store;
