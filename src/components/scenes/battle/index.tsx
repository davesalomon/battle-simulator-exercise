import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import PlayerHeroType from "../../../game-objects/heroes/base";
import MonsterType from "../../../game-objects/monsters/base";
import { determineNewHero, determineNewMonster } from "../../../utils/battle";
import Monster from "../../monster";
import PlayerHero from "../../player-hero";
import { addHero, addMonster, selectBattleWinner, startBattle } from "./slice";
import SoundPlayer from "../../sound-player";
import AttackButton from "../../attack-button";
import RoundResult from "../../round-result";
import BattleResult from "../../battle-result";
// @ts-ignore
import music from "./music/1.mp3";
import background from "./background/1.svg";

// I started adding skeleton support for having multiple hero's / enemies; I realised I could
// sink a lot of time in to working on code eto positioning these things (based on the index of the map),
// so ended up removing the code to keep it simple.

const useStyles = createUseStyles({
  attackButtonContainer: {
    textAlign: "center",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  resultContainer: {
    textAlign: "center",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 30,
  },
  battleSceneBackground: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
    "&:after": {
      content: '""',
      backgroundImage: `url('${background}')`,
      backgroundPosition: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      opacity: 0.25,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      zIndex: -1,
      transform: "scaleX(-1)",
    },
  },
  characterContainer: {
    width: "100%",
    position: "relative",
    marginTop: "25vh",
    height: "50vh",
  },
  soundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

const BattleScene = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [heroInstance, setHeroInstance] = useState(
    null as PlayerHeroType | null
  );
  const [monsterInstance, setMonsterInstance] = useState(
    null as MonsterType | null
  );

  const isBattleFinished = !!useSelector(selectBattleWinner);

  useEffect(() => {
    const monster = determineNewMonster();
    const hero = determineNewHero();

    dispatch(startBattle());
    dispatch(addMonster({ ...monster.data, type: monster.type }));
    dispatch(addHero({ ...hero.data, type: hero.type }));

    setMonsterInstance(monster.data);
    setHeroInstance(hero.data);
  }, [dispatch]);

  if (!monsterInstance || !heroInstance) {
    return null; // TODO: Handle Error
  }

  return (
    <div className={classes.battleSceneBackground}>
      <div className={classes.resultContainer}>
        <RoundResult />
      </div>

      <BattleResult />

      <div className={classes.characterContainer}>
        <PlayerHero id={heroInstance.id} />
        <Monster id={monsterInstance.id} />
      </div>

      <div className={classes.attackButtonContainer}>
        <AttackButton hero={heroInstance} monster={monsterInstance} />
      </div>

      <div className={classes.soundContainer}>
        {!isBattleFinished && <SoundPlayer loop hasMuteButton source={music} />}
      </div>
    </div>
  );
};

export default BattleScene;
