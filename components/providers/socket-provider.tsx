"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { io as ClientIO } from "socket.io-client";

type SocketContexteType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContexteType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // NEXT_PUBLIC_SITE_URL -> local. à change lors du déploiement

    const socketInstance = new (ClientIO as any)(
      process.env.PUBLIC_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
        transports: ['polling', 'websocket']
      }
    );
    
    
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
