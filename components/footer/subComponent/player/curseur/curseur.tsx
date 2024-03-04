import { callCurrentTrack, seek } from "../../../../../src/hooks/hooks";

import React from "react";
import { Token } from "@types";
import style from "./curseur.module.css";
import { useEffect } from "react";
import { useMainStore } from "../../../../../src/store/store";

const Curseur = ({
  token,
  runProgress,
  setProgress,
  isPlaying,
}: {
  token: Token;
  runProgress: number;
  setProgress: Function;
  isPlaying: boolean;
}) => {
  // en ms :
  const player = useMainStore((state) => state.player);
  const setPlayer = useMainStore((state) => state.setPlayer);

  const setToken = useMainStore((state) => state.setToken);
  const setTrack = useMainStore((state) => state.setTrack);

  // B : render si le track est relaod ou si on pause/play dû au useEffect  A
  useEffect(() => {
    // create a interval and get the id
    if (isPlaying) {
      const myInterval = setInterval(() => {
        const delay = Date.now() - Number.parseInt(player.dateAppel);
        setProgress(player.progress + delay);
      }, 1000);
      // clear out the interval using the id when unmounting the component
      return () => clearInterval(myInterval);
    }
  }, [player]);

  useEffect(() => {
    if (token?.tokenId && runProgress > player.duration) {
      callCurrentTrack(token, setTrack, setPlayer, setToken);
      setProgress(0);
    }
  }, [runProgress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(event.target.value));
  };

  const handleSeek = () => {
    seek(token?.tokenId, runProgress);
    setPlayer({
      ...player,
      progress: runProgress,
      dateAppel: Date.now().toString(),
    });
  };

  const displayTime = (time: number) => {
    const inputSecondes = Math.floor(time / 1000);
    const minute = Math.floor(inputSecondes / 60);
    const seconde = Math.floor(inputSecondes % 60);
    const secondeStr = seconde < 10 ? "0".concat(seconde.toString()) : seconde;
    return minute + " : " + secondeStr;
  };

  return (
    <div className={style.curseur}>
      <div className={style.progress}>
        {runProgress != undefined ? displayTime(runProgress) : "- : -"}
      </div>
      <input
        className={style.input}
        type="range"
        max={player?.duration}
        value={runProgress ? runProgress : 0}
        onChange={handleInputChange}
        onMouseUp={handleSeek}
        step={1000}
      />

      <div className={`${style.progress} text-right`}>
        {player?.duration ? displayTime(player?.duration) : "- : -"}
      </div>
    </div>
  );
};

export default Curseur;
