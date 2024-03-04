import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = JSON.parse(req?.body?.data);
    const user = await prisma.user.findFirst({
      where: { email: data.user.email },
      include: {
        accounts: true,
      },
    });
    
    res.status(200).json(user?.accounts[0]);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Something went wrong" });
  }
};
