import React from "react";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import {
  FightWinnerType,
  selectHero,
  selectRoundWinner,
} from "../scenes/battle/slice";
import heroes from "../../game-objects/heroes";
import CharacterAvatar from "../character-avatar";
import HealthBar from "../healthbar";
import DiceRollResult from "../dice-roll-result";
import SoundPlayer from "../sound-player";

const useStyles = createUseStyles({
  container: {
    width: "40%",
    position: "absolute",
    left: "5%",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

interface Props {
  id: string;
}

const PlayerHero = ({ id }: Props) => {
  const classes = useStyles();

  const hero = useSelector(selectHero);
  const roundWinner = useSelector(selectRoundWinner);

  if (!hero) {
    return null; // TODO: Handle Error
  }

  const PlayerHeroData = Object.values(heroes).find(
    (a) => a.type === hero.type
  );

  if (!PlayerHeroData) {
    return null; // TODO: Handle Error
  }

  const isDead = hero.hp <= 0;

  return (
    <div className={classes.container}>
      {roundWinner === FightWinnerType.MONSTER && !isDead && (
        <SoundPlayer source={PlayerHeroData.hitSound} />
      )}
      <DiceRollResult type={FightWinnerType.PLAYER} />
      <HealthBar currentHealth={hero.hp} maxHealth={PlayerHeroData.maxHp} />
      <CharacterAvatar
        isAttacking={roundWinner === FightWinnerType.PLAYER}
        isHit={roundWinner === FightWinnerType.MONSTER}
        isDead={isDead}
        image={PlayerHeroData.image}
        name={PlayerHeroData.type}
      />
    </div>
  );
};

export default PlayerHero;
