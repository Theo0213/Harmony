import { Server as NetServer, Socket } from "net";
import { Player, Track, User } from "@prisma/client";

import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface Token {
  tokenId: string;
  expired: boolean;
}

export type UserPlayerTrack = User & { player: Player & { track: Track } };

export const createUserPlayerTrack = (
  user: User,
  player: Player,
  track: Track
): UserPlayerTrack => {
  return {
    ...user,
    player: { ...player, track: { ...track } },
  };
};
