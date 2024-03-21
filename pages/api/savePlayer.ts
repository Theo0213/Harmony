import { NextApiResponseServerIo, createUserPlayerTrack } from "@types";
import { Player, Track, User } from "@prisma/client";

import type { NextApiRequest } from "next";
import { prisma } from "../../src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = JSON.parse(req.body.user) as User;
    const player = JSON.parse(req.body.player) as Player;
    const { isPlaying, progress, duration, dateAppel } = player;

    const track = JSON.parse(req.body.track) as Track;
    const { name, imageURL, artistes } = track;

    await prisma.player.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        isPlaying,
        progress,
        duration,
        dateAppel,
        track: {
          create: {
            songId: track.songId,
            artistes: artistes,
            name,
            imageURL,
          },
        },
      },
      update: {
        isPlaying,
        progress,
        duration,
        dateAppel,
        track: {
          update: {
            songId: track.songId,
            artistes: artistes,
            name: track.name,
            imageURL: track.imageURL,
          },
        },
      },
    });

    const userPlayerTrack = createUserPlayerTrack(user, player, track)
    res?.socket?.server?.io?.emit("world", userPlayerTrack);

    res.status(200).json(userPlayerTrack);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Something went wrong" });
  }
};
