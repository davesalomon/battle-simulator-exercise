import React from "react";
// @ts-ignore
import { fireEvent } from "@testing-library/react";
import { renderWithRedux } from "../../utils/test";
import AttackButton from "./index";
import KnightHero from "../../game-objects/heroes/knight";
import SlugMonster from "../../game-objects/monsters/slug_monster";

test("calls attack on the instances passed in when clicked", () => {
  const hero = new KnightHero();
  const monster = new SlugMonster();

  jest.spyOn(hero, "attack");
  jest.spyOn(monster, "attack");

  const { getByText } = renderWithRedux(
    <AttackButton hero={hero} monster={monster} />
  );

  fireEvent.click(getByText("Attack!"));

  expect(hero.attack).toHaveBeenCalled();
  expect(monster.attack).toHaveBeenCalled();
});
