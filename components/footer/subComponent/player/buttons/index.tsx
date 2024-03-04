import { Player, Track } from "@prisma/client";
import { next, pause, play, previous } from "../../../../../src/hooks/hooks";

import { Token } from "@types";
import style from "./buttons.module.css";
import { useMainStore } from "../../../../../src/store/store";

const Buttons = ({
  track,
  token,
  setProgress,
  isPlaying,
  setIsPlaying,
}: {
  track: Track;
  token: Token;
  setProgress: Function;
  isPlaying: boolean;
  setIsPlaying: Function;
}) => {
  const playPath = "M8,5.14V19.14L19,12.14L8,5.14Z";
  const pausePath = "M14,19H18V5H14M6,19H10V5H6V19Z";
  const previousPath =
    "M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z";
  const nextPath =
    "M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z";

  const player = useMainStore((state) => state.player);
  const setPlayer = useMainStore((state) => state.setPlayer);

  const setTrack = useMainStore((state) => state.setTrack);
  const setToken = useMainStore((state) => state.setToken);

  const usePausePlay = () => {
    if (token?.tokenId && track?.songId) {
      if (isPlaying) {
        pause(token);
        setIsPlaying(!isPlaying)
      } else {
        play(token);
        setIsPlaying(!isPlaying)
      }
    }
  };

  function changeTrack(suivant: boolean) {
    if (suivant) {
      next(token, setTrack, setPlayer, setToken);
      setIsPlaying(true)
    } else {
      previous(token, setTrack, setPlayer, setToken);
      setIsPlaying(true)
    }
    setProgress(0);
  }

  return (
    <div className={style.boutons}>
      <button
        onClick={() => changeTrack(false)}
        type="button"
        className={style.buttonSecondary}
      >
        <svg viewBox="0 0 16 16" className={style.iconSecondary}>
          <path d={previousPath} />
        </svg>
      </button>
      <button
        onClick={() => usePausePlay()}
        type="button"
        className={style.buttonMain}
      >
        <svg viewBox="0 0 24 24" className={style.iconMain}>
          <path d={player?.isPlaying ? pausePath : playPath} />
        </svg>
      </button>

      <button
        onClick={() => changeTrack(true)}
        type="button"
        className={style.buttonSecondary}
      >
        <svg viewBox="0 0 16 16" className={style.iconSecondary}>
          <path d={nextPath} />
        </svg>
      </button>
    </div>
  );
};

export default Buttons;
