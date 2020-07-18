import React from "react";
import { useSelector } from "react-redux";
import { selectBattleStats } from "../scenes/battle/slice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  battleStatsContainer: {
    color: "#fff",
    textAlign: "center",
  },
});

const BattleStats = () => {
  const battleStats = useSelector(selectBattleStats);
  const classes = useStyles();
  const simpleStatsString = JSON.stringify(battleStats, null, 4);

  return (
    <div className={classes.battleStatsContainer}>
      <pre>{simpleStatsString.substr(1, simpleStatsString.length - 2)}</pre>
    </div>
  );
};

export default BattleStats;
