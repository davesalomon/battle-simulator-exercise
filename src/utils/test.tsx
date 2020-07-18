import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import deepmerge from "deepmerge";
import { options } from "../store";
import { initialState as initialBattleState } from "../components/scenes/battle/slice";
import { initialState as initialOptionsState } from "../components/sound-player/slice";

export const renderWithRedux = (
  component: JSX.Element,
  { store = configureStore(options) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

export const mockStoreState = (overrides: any) => () =>
  deepmerge(
    {
      options: initialOptionsState(),
      battle: initialBattleState(),
    },
    overrides
  );
