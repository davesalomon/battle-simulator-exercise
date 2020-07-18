import React, { useState, useEffect } from "react";
import {
  FightWinnerType,
  selectHeroDice,
  selectMonsterDice,
} from "../scenes/battle/slice";
import { useSelector } from "react-redux";
import d1 from "./d1.svg";
import d2 from "./d2.svg";
import d3 from "./d3.svg";
import d4 from "./d4.svg";
import d5 from "./d5.svg";
import d6 from "./d6.svg";
import { createUseStyles } from "react-jss";
import SoundPlayer from "../sound-player";
// @ts-ignore
import sound from "./sound.mp3";

interface Props {
  type: FightWinnerType;
}

const useStyles = createUseStyles({
  diceContainer: {
    textAlign: "center",
    width: "100%",
    height: 55,
    "& img": {
      margin: "0 10px",
      width: 50,
    },
  },
});

const DiceRollResult = ({ type }: Props) => {
  const result = useSelector(
    type === FightWinnerType.PLAYER ? selectHeroDice : selectMonsterDice
  );

  const [dieResult, setDieResult] = useState(result);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    setDieResult(result);
    if (!result.length) {
      return;
    }
    setPlaySound(true);

    const rollingDiceResult = setInterval(() => {
      const randomResults = result.map(() =>
        Math.floor(Math.random() * (6 - 1) + 1)
      );
      setDieResult(randomResults);
    }, 100);
    setTimeout(() => {
      setDieResult(result);
      clearInterval(rollingDiceResult);
      setPlaySound(false);
    }, 1000);
  }, [result]);

  const classes = useStyles();

  const img = (dieResult: number) => {
    let path;
    switch (dieResult) {
      case 1:
        path = d1;
        break;
      case 2:
        path = d2;
        break;
      case 3:
        path = d3;
        break;
      case 4:
        path = d4;
        break;
      case 5:
        path = d5;
        break;
      case 6:
        path = d6;
        break;
      default:
        throw new Error(`Unsupported Dice Result: ${dieResult}`); // TODO: Handle error
    }
    return <img src={path} alt={`Rolled ${dieResult}`} />;
  };

  return (
    <div className={classes.diceContainer}>
      {!!dieResult.length && playSound && <SoundPlayer source={sound} />}
      {dieResult.map((number) => {
        // TODO: Fix, this animation doesn't correlate with the configurable "max sides of die".
        return img(number);
      })}
    </div>
  );
};

export default DiceRollResult;
