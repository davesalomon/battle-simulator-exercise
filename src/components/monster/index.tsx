import React from "react";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import {
  FightWinnerType,
  selectMonster,
  selectRoundWinner,
} from "../scenes/battle/slice";
import monsters from "../../game-objects/monsters";
import CharacterAvatar from "../character-avatar";
import HealthBar from "../healthbar";
import DiceRollResult from "../dice-roll-result";
import SoundPlayer from "../sound-player";

interface Props {
  id: string;
}

const useStyles = createUseStyles({
  container: {
    width: "40%",
    position: "absolute",
    right: "5%",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

const MonsterComponent = ({ id }: Props) => {
  const classes = useStyles();

  const monster = useSelector(selectMonster);
  const roundWinner = useSelector(selectRoundWinner);

  if (!monster) {
    return null; // TODO: Handle Error
  }

  const MonsterData = Object.values(monsters).find(
    (a) => a.type === monster.type
  );

  if (!MonsterData) {
    return null; // TODO: Handle Error
  }

  const isDead = monster.hp <= 0;

  return (
    <div className={classes.container}>
      {roundWinner === FightWinnerType.PLAYER && !isDead && (
        <SoundPlayer source={MonsterData.hitSound} />
      )}
      <DiceRollResult type={FightWinnerType.MONSTER} />
      <HealthBar currentHealth={monster.hp} maxHealth={MonsterData.maxHp} />
      <CharacterAvatar
        isReverse
        isAttacking={roundWinner === FightWinnerType.MONSTER}
        isHit={roundWinner === FightWinnerType.PLAYER}
        isDead={isDead}
        image={MonsterData.image}
        name={MonsterData.type}
      />
    </div>
  );
};

export default MonsterComponent;
