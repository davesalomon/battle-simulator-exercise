import React from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { FightWinnerType, selectBattleWinner } from "../scenes/battle/slice";
import { createUseStyles } from "react-jss";
import SoundPlayer from "../sound-player";
import BattleStats from "../battle-stats";
// @ts-ignore
import playerWin from "./player-win.mp3";
// @ts-ignore
import monsterWin from "./monster-win.mp3";

const useStyles = createUseStyles({
  battleResultBg: {
    background: "#000",
    top: 0,
    left: 0,
    position: "absolute",
    width: "100vw",
    height: "100vh",
    opacity: 0,
    zIndex: -1,
    overflow: "hidden",
    transition: "1s",
    transitionProperty: "opacity",
  },
  isActive: {
    zIndex: 100,
    opacity: 1,
  },
  battleResultText: {
    fontSize: 32,
    textAlign: "center",
  },
  defeated: {
    color: "#f00",
  },
  winner: {
    color: "#0f0",
  },
});

const BattleResult = () => {
  const battleWinner = useSelector(selectBattleWinner);
  const classes = useStyles();

  return (
    <div
      className={classnames(classes.battleResultBg, {
        [classes.isActive]: !!battleWinner,
      })}
    >
      {!!battleWinner && (
        <SoundPlayer
          theme="light"
          loop
          hasMuteButton
          source={
            battleWinner === FightWinnerType.PLAYER ? playerWin : monsterWin
          }
        />
      )}

      {battleWinner === FightWinnerType.MONSTER && (
        <p className={classnames(classes.battleResultText, classes.defeated)}>
          Game Over
        </p>
      )}
      {battleWinner === FightWinnerType.PLAYER && (
        <p className={classnames(classes.battleResultText, classes.winner)}>
          You win!
        </p>
      )}

      <BattleStats />
    </div>
  );
};

export default BattleResult;
