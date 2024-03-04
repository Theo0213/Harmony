import { Player, Track, User } from "@prisma/client";
import { StateCreator, create } from "zustand";

import { Token } from "@types";
import { devtools } from "zustand/middleware";

interface IToken {
  token: Token;
  setToken: (token: Token) => void;
}
interface ITrack {
  track: Track;
  setTrack: (track: Track) => void;
}

interface IPlayer {
  player: Player;
  setPlayer: (player: Player) => void;
}

interface IUser {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore: StateCreator<IUser, [["zustand/devtools", never]]> = (
  set
) => ({
  user: {
    id: "",
    name: "",
    email: "",
    emailVerified: null,
    image: "",
    latitude: null,
    longitude: null,
  },
  setUser: (user: User) => set({ user }, false, "setUser"),
});

const usePlayerStore: StateCreator<IPlayer, [["zustand/devtools", never]]> = (
  set
) => ({
  player: {
    id: 0,
    progress: 0,
    duration: 0,
    dateAppel: "",
    isPlaying: false,
    userId: "",
  },
  setPlayer: (player: Player) => set({ player }, false, "setPlayer"),
});

const useTrackStore: StateCreator<ITrack, [["zustand/devtools", never]]> = (
  set
) => ({
  track: {
    id: 0,
    songId: "",
    name: "",
    artistes: [""],
    imageURL: "",
    playerId: 0,
  },
  setTrack: (track: Track) => set({ track }, false, "setTrack"),
});

const useTokenStore: StateCreator<IToken, [["zustand/devtools", never]]> = (
  set
) => ({
  token: {
    tokenId: "",
    expired: false,
  },
  setToken: (token: Token) => set({ token }, false, "setToken"),
});

export const useMainStore = create<
  IToken & IPlayer & ITrack & IUser,
  [["zustand/devtools", never]]
>(
  devtools((...a) => ({
    ...usePlayerStore(...a),
    ...useTokenStore(...a),
    ...useTrackStore(...a),
    ...useUserStore(...a),
  }))
);
