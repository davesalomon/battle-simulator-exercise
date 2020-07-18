import React from "react";
import Sound from "react-sound";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import Speaker from "./icon";
import SpeakerMuted from "./icon-muted";
import { selectedIsMuted, toggleMuteStatus } from "./slice";

// @ts-ignore
if (window.soundManager) {
  // @ts-ignore
  window.soundManager.setup({ ignoreMobileRestrictions: true });
}

interface Props {
  source: string;
  hasMuteButton?: boolean;
  loop?: boolean;
  theme?: "light" | "dark";
}

const useStyles = createUseStyles({
  button: {
    background: "transparent",
    border: 0,
    width: 50,
    height: 50,
    '& svg': {
      width: '100%',
      height: '100%'
    }
  },
});

const SoundPlayer = ({
  source,
  theme = "dark",
  hasMuteButton,
  loop = false,
}: Props) => {
  const isMuted = useSelector(selectedIsMuted);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div>
      {hasMuteButton && (
        <button
          className={classes.button}
          onClick={() => {
            dispatch(toggleMuteStatus());
          }}
        >
          {isMuted ? <SpeakerMuted theme={theme} /> : <Speaker theme={theme} />}
        </button>
      )}

      {
        <Sound
          url={source}
          loop={loop}
          playStatus={isMuted ? "STOPPED" : "PLAYING"}
        />
      }
    </div>
  );
};

export default SoundPlayer;
