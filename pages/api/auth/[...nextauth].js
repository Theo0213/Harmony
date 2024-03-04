import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import SpotifyProvider from "next-auth/providers/spotify";
import { prisma } from "../../../src/lib/prisma";

async function refreshAccessToken(userId, newAccount) {
  try {
    const userAccount = await prisma.account.findFirst({
      where: { userId: userId },
    });
    if (userAccount.expires_at) {
      if (new Date().getTime() < userAccount.expires_at) {
        return;
      }
    }
    const refreshToken = userAccount.refresh_token;
    const params = new URLSearchParams();
    params.append("client_id", process.env.NEXT_PUBLIC_SPOTIFY_ID);
    params.append("client_secret", process.env.NEXT_PUBLIC_SPOTIFY_SECRET);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: headers,
      body: params,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      if (refreshedTokens.error === "invalid_grant") {
        await prisma.account.update({
          where: { id: userAccount.id },
          data: {
            refresh_token: newAccount.refresh_token,
            access_token: newAccount.access_token,
            expires_at: newAccount.expires_at,
          },
        });
        return;
      }
      throw refreshedTokens;
    }

    await prisma.account.update({
      where: { id: userAccount.id },
      data: {
        refresh_token: refreshedTokens.refresh_token ?? refreshToken,
        access_token: refreshedTokens.access_token,
        expires_at: refreshedTokens.expires_at,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const authConfig = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state",
    }),
  ],
  events: {
    async signIn(payload) {
      await refreshAccessToken(payload.user.id, payload.account);
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authConfig);
