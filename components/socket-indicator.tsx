"use client";

import { useSocket } from "./providers/socket-provider";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <button className="bg-yellow-600 text-white border-none">
        Fallback: Polling every 1s
      </button>
    );
  }
  return (
    <button className="bg-emerald-600 text-white border-none">
      Live: Real-time updates
    </button>
  );
};
