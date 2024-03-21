import { Player, Prisma, Track, User } from "@prisma/client";

export async function selectUser(userId: string) {
  const params = new URLSearchParams();
  params.append("userId", userId);
  const response = await fetch("/api/user/selectUser", {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function selectUsers(user: User) {
  const params = new URLSearchParams();
  params.append("user", JSON.stringify(user));
  const response = await fetch("/api/user/selectUsers", {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function updateUser(
  userId: string,
  latitude: number,
  longitude: number
) {
  const params = new URLSearchParams();
  params.append("userId", userId);
  params.append("longitude", longitude.toString());
  params.append("latitude", latitude.toString());
  const response = await fetch("/api/user/updateUser", {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function getAccount(data: any) {
  const params = new URLSearchParams();
  params.append("data", JSON.stringify(data));
  const response = await fetch("/api/account/getAccount", {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } 
  else if (response.status===210){
    throw response;
  }
  
  return await response.json();
}

export async function savePlayer(
  user: Prisma.UserCreateInput,
  track: Track,
  player: Player
) {
  const params = new URLSearchParams();
  params.append("user", JSON.stringify(user));
  params.append("track", JSON.stringify(track));
  params.append("player", JSON.stringify(player));
  const response = await fetch("/api/savePlayer", {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}