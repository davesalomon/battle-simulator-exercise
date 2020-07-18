import React from "react";
import { useSelector } from "react-redux";
import {
  FightWinnerType,
  selectBattleWinner,
  selectRoundDamageAmount,
  selectRoundWinner,
} from "../scenes/battle/slice";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  roundWinnerText: {
    background: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    padding: '5px 20px'
  }
});

const RoundResult = () => {
  const roundWinner = useSelector(selectRoundWinner);
  const damageAmount = useSelector(selectRoundDamageAmount);
  const isBattleOver = !!useSelector(selectBattleWinner);

  const classes = useStyles();

  if (isBattleOver || !roundWinner) {
    return null;
  }

  let winnerString = " ";
  if (roundWinner) {
    switch (roundWinner) {
      case FightWinnerType.PLAYER:
        winnerString = `You hit the enemy for ${damageAmount} damage!`;
        break;
      case FightWinnerType.MONSTER:
        winnerString = `The enemy hits you for ${damageAmount} damage!`;
        break;
      case FightWinnerType.DRAW:
        winnerString = "This round is a draw!";
        break;
      default:
        throw new Error(); // TODO: Handle error
    }
  }

  return <p className={classes.roundWinnerText}>{winnerString}</p>;
};

export default RoundResult;
