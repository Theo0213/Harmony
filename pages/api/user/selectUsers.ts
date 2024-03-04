import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = JSON.parse(req.body.user);
    // where position not null
    const users = await prisma.user.findMany({
      where: { id: { not: user.id } },
      include: {
        player: {
          include: {
            track: true,
          },
        },
      },
    });
    res.status(200).json(users);

  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Something went wrong" });
  }
};
