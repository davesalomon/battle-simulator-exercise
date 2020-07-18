import React from "react";
import { createUseStyles } from "react-jss";
import config from "../../constants/config";

interface Props {
  image: string;
  name: string;
  isReverse?: boolean;
  isAttacking?: boolean;
  isHit?: boolean;
  isDead?: boolean;
}

const useStyles = createUseStyles(() => ({
  "@keyframes bounce": {
    "0%": { left: -10 },
    "50%": { left: 10 },
    "100%": { left: -10 },
  },
  "@keyframes bounce-reverse": {
    "0%": { left: 10 },
    "50%": { left: -10 },
    "100%": { left: 10 },
  },
  "@keyframes attack-left": {
    "0%": { left: 0, opacity: 1 },
    "75%": { left: "-250vw", opacity: 1 },
    "80%": { left: "-250vw", opacity: 0 },
    "90%": { left: 0, opacity: 0 },
    "100%": { left: 0, opacity: 1 },
  },
  "@keyframes attack-right": {
    "0%": { left: 0, opacity: 1 },
    "50%": { left: "250vw", opacity: 1 },
    "55%": { left: "250vw", opacity: 0 },
    "65%": { left: "0vw", opacity: 0 },
    "100%": { left: "0vw", opacity: 1 },
  },
  "@keyframes hit": {
    "0%": { left: 0, transform: "rotate(0deg)" },
    "20%": { left: -60, transform: "rotate(30deg)" },
    "40%": { left: 60, transform: "rotate(-30deg)" },
    "60%": { left: -60, transform: "rotate(30deg)" },
    "80%": { left: 60, transform: "rotate(-30deg)" },
    "100%": { left: 0, transform: "rotate(0deg)" },
  },
  characterAvatar: {
    maxWidth: "100%",
    maxHeight: 150,
    animation: (props) => {
      const isInfinite = props.isAttacking || props.isHit ? false : true;
      return `${config.characterBattleAnimationsDuration}s linear ${
        isInfinite ? "infinite" : ""
      }`;
    },
    animationName: (props) => {
      let animationName = props.isReverse ? "$bounce-reverse" : "$bounce";
      if (props.isAttacking) {
        if (props.isReverse) {
          animationName = "$attack-left";
        } else {
          animationName = "$attack-right";
        }
      }
      if (props.isHit) {
        return "$hit";
      }
      return animationName;
    },
    position: "relative",
  },
}));

const CharacterAvatar = (props: Props) => {
  const classes = useStyles(props);

  return (
    <img
      className={classes.characterAvatar}
      src={props.image}
      alt={props.name}
    />
  );
};

export default CharacterAvatar;
