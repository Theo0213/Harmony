"use client";

import style from "./volume.module.css";
import { useSocket } from "../../../providers/socket-provider";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className={style.yellowLed}></div>
    );
  }
  return (
    <div className={style.greenLed}></div>
  );
};
