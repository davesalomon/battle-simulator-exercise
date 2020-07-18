import React from "react";
import { createUseStyles } from "react-jss";

interface Props {
  currentHealth: number;
  maxHealth: number;
}

const useStyles = createUseStyles({
  healthBar: {
    width: "40%",
    marginLeft: "30%",
    height: 5,
    border: "1px solid #000",
    background: "#f00",
    marginBottom: 30,
    "&:after": {
      content: '""',
      background: "#0f0",
      width: (currentHealthPercent) => {
        return `${currentHealthPercent}%`;
      },
      height: 5,
      display: "block",
      right: 0,
      transition: '1s',
      transitionTimingFunction: 'linear'
    },
  },
  health: {
    fontSize: "1.2em",
    textAlign: "center",
    textShadow: "0px 0px 1px #fff",
    fontWeight: "bold",
  },
});

const HealthBar = ({ currentHealth, maxHealth }: Props) => {
  const classes = useStyles((currentHealth / maxHealth) * 100);
  return (
    <div>
      <p className={classes.health}>
        {currentHealth} / {maxHealth}
      </p>
      <div className={classes.healthBar} />
    </div>
  );
};

export default HealthBar;
