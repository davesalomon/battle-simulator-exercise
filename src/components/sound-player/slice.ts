import { createSlice } from "@reduxjs/toolkit";

type WrappedInitialState = {
  options: InitialState;
};

export type InitialState = {
  isMuted: boolean;
};

export const initialState = (state = {} as InitialState): InitialState => {
  state.isMuted = true;
  return state;
};

export const counterSlice = createSlice({
  name: "options",
  initialState: initialState(),
  reducers: {
    toggleMuteStatus: (state) => {
      state.isMuted = !state.isMuted;
    },
  },
});

export const { toggleMuteStatus } = counterSlice.actions;

export const selectedIsMuted = (state: WrappedInitialState) =>
  state.options.isMuted;

export default counterSlice.reducer;
