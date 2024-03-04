import React, { useEffect } from "react";

import Buttons from "./buttons";
import Curseur from "./curseur/curseur";
import { Token } from "@types";
import { Track } from "@prisma/client";
import style from "./player.module.css";
import { useMainStore } from "../../../../src/store/store";
import { useState } from "react";

const Player = ({ track, token }: { track: Track; token: Token }) => {
  const player = useMainStore((state) => state.player);
  const setPlayer = useMainStore((state) => state.setPlayer);
  const [runProgress, setProgress] = useState(player?.progress);
  const [isPlaying, setIsPlaying] = useState(player?.isPlaying);

  useEffect(() => {
    if (!isPlaying) {
      setPlayer({ ...player, progress: runProgress, isPlaying: isPlaying });
    } else {
      setPlayer({
        ...player,
        dateAppel: Date.now().toString(),
        isPlaying: isPlaying,
      });
    }
  }, [isPlaying]);

  useEffect(()=> {
    setIsPlaying(player.isPlaying)
    setProgress(player.progress)
  }, [player])

  return (
    <div className={style.player}>
      <Buttons
        track={track}
        token={token}
        setProgress={setProgress}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Curseur
        token={token}
        runProgress={runProgress}
        setProgress={setProgress}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default Player;
