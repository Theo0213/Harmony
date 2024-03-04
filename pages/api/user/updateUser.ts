import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, latitude, longitude } = req.body;
    await prisma.user.update({
      where: { id: userId },
      data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });

    res.status(200);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Something went wrong" });
  }
};
