import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userId = req.body.userId;
    
    // where position not null
    const userBDD = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        player: {
          include: {
            track: true,
          },
        },
      },
    });
    res.status(200).json(userBDD);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Something went wrong" });
  }
};
