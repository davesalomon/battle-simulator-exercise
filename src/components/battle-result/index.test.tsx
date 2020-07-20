import React from "react";
// @ts-ignore
import { renderWithRedux, mockStoreState } from "../../utils/test";
import { Provider } from "react-redux";
import store from "../../store";
import BattleResult from "./index";
import { FightWinnerType } from "../scenes/battle/slice";

const storeGetState = store.getState;

it("SHOULD not have an active class on the root element", () => {
  const { container } = renderWithRedux(
    <Provider store={store}>
      <BattleResult />
    </Provider>
  );

  expect(
    (container.firstChild as HTMLElement).className.includes("isActive")
  ).toBe(false);
});

describe("GIVEN the player is the winner", () => {
  beforeEach(() => {
    store.getState = mockStoreState({
      battle: {
        battleWinner: FightWinnerType.PLAYER,
      },
    });
  });

  afterEach(() => {
    store.getState = storeGetState;
  });

  it("SHOULD be 'active' on the root element", () => {
    const { container } = renderWithRedux(
      <Provider store={store}>
        <BattleResult />
      </Provider>
    );

    const rootElement = container.firstChild;
    expect(rootElement).toBeInTheDocument();
    expect((rootElement as HTMLElement).className.includes("isActive")).toBe(
      true
    );
  });

  it("SHOULD display 'You win!'", () => {
    const { getByText } = renderWithRedux(
      <Provider store={store}>
        <BattleResult />
      </Provider>
    );

    expect(getByText("You win!")).toBeInTheDocument();
  });
});

describe("GIVEN the monster is the winner", () => {
  beforeEach(() => {
    store.getState = mockStoreState({
      battle: {
        battleWinner: FightWinnerType.MONSTER,
      },
    });
  });

  afterEach(() => {
    store.getState = storeGetState;
  });

  it("SHOULD be 'active' on the root element", () => {
    const { container } = renderWithRedux(
      <Provider store={store}>
        <BattleResult />
      </Provider>
    );

    const rootElement = container.firstChild;
    expect(rootElement).toBeInTheDocument();
    expect((rootElement as HTMLElement).className.includes("isActive")).toBe(
      true
    );
  });

  it("SHOULD display 'Gave Over'", () => {
    const { getByText } = renderWithRedux(
      <Provider store={store}>
        <BattleResult />
      </Provider>
    );

    expect(getByText("Game Over")).toBeInTheDocument();
  });
});
