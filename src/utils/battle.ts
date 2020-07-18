import KnightHero from "../game-objects/heroes/knight";
import SlugMonster from "../game-objects/monsters/slug_monster";
import Monster from "../game-objects/monsters/base";
import PlayerHero from "../game-objects/heroes/base";

export const determineNewMonster = (): { data: Monster; type: string } => {
  const selectedMonster = 1; // Math.random for e.g.

  switch (selectedMonster) {
    case 1:
      return {
        type: SlugMonster.type,
        data: new SlugMonster(),
      };
    default:
      throw new Error();
  }
};

export const determineNewHero = (): { data: PlayerHero; type: string } => {
  return {
    type: KnightHero.type,
    data: new KnightHero(),
  };
};

export const generateAttackValue = (
  numberOfDie: number,
  numberOfSidesPerDie: number
): number[] => {
  const attackValues = [];
  for (let i = 0; i < numberOfDie; ++i) {
    attackValues.push(
      Math.floor(Math.random() * (numberOfSidesPerDie - 1) + 1)
    );
  }
  return attackValues;
};
