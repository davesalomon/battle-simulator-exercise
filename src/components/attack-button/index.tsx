import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import SwordIcon from "./sword-icon.svg";
import { useDispatch } from "react-redux";
import PlayerHero from "../../game-objects/heroes/base";
import Monster from "../../game-objects/monsters/base";
import {
  resetRound,
  setHeroDiceRollValues,
  setMonsterDiceRollValues,
  calculateDamageAndEndRound,
} from "../scenes/battle/slice";
import config from "../../constants/config";

interface Props {
  hero: PlayerHero;
  monster: Monster;
}

const useStyles = createUseStyles({
  attackButton: {
    background: "rgba(255, 255, 255, 0.8)",
    border: "1px solid #000",
    fontSize: "2em",
    padding: 10,
    maxWidth: 200,
    minWidth: "20%",
  },
  swordIcon: {
    width: "10%",
    maxWidth: "100%",
    minWidth: 40,
    height: 30,
    position: "relative",
    top: 5,
  },
});

const AttackButton = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <button
      disabled={isDisabled}
      className={classes.attackButton}
      onClick={() => {
        setIsDisabled(true);
        const heroRolls = props.hero.attack();
        const monsterRolls = props.monster.attack();

        dispatch(setHeroDiceRollValues(heroRolls));
        setTimeout(() => {
          dispatch(setMonsterDiceRollValues(monsterRolls));
        }, 1500);

        setTimeout(() => {
          dispatch(calculateDamageAndEndRound());
        }, 3000);

        setTimeout(() => {
          dispatch(resetRound());
          setIsDisabled(false);
        }, 3000 + config.characterBattleAnimationsDuration * 1000);
      }}
    >
      <img className={classes.swordIcon} src={SwordIcon} alt="Attack" />
      Attack!
    </button>
  );
};

export default AttackButton;
