import { toast } from "sonner";

// latence Spotify
const timeOut = 1000;

export const pause = async (token) => {
  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token.tokenId);

  await fetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: "PUT",
    headers: headers,
  });
};

export const play = async (token) => {
  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token.tokenId);
  headers.set("Content-Type", "application/json");
  await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: headers,
  }).catch((error) => console.log(error));
};

// ne récupère pas la liste des artistes.
export const playOther = async (token, player, setTrack, setPlayer) => {
  const uris = ["spotify:track:" + player?.track?.songId];
  const position_ms = player?.progress;

  const bodyData = {
    uris: uris,
    position_ms: position_ms,
  };

  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token.tokenId);
  headers.set("Content-Type", "application/json");
  await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(bodyData),
  })
    .then(
      setTimeout(() => {
        callCurrentTrack(token, setTrack, setPlayer);
      }, timeOut)
    )
    .catch((error) => console.log(error));
};

export const seek = async (token, position) => {
  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token);
  headers.set("Content-Type", "application/json");
  await fetch(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`,
    {
      method: "PUT",
      headers: headers,
    }
  ).catch((error) => console.log(error));
};

export const next = async (token, setTrack, setPlayer, setToken) => {
  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token.tokenId);
  headers.set("Content-Type", "application/json");

  await fetch(`https://api.spotify.com/v1/me/player/next`, {
    method: "POST",
    headers: headers,
  })
    // timeOut pour laisser le temps à Spotify de changer de musique.
    .then(
      setTimeout(() => {
        callCurrentTrack(token, setTrack, setPlayer, setToken);
      }, timeOut)
    )
    .catch((error) => console.log(error));
};

export const previous = async (token, setTrack, setPlayer, setToken) => {
  const headers = new Headers();
  headers.set("Authorization", "Bearer " + token.tokenId);
  headers.set("Content-Type", "application/json");

  await fetch(`https://api.spotify.com/v1/me/player/previous`, {
    method: "POST",
    headers: headers,
  })
    // timeOut pour laisser le temps à Spotify de changer de musique.
    .then(
      setTimeout(() => {
        callCurrentTrack(token, setTrack, setPlayer, setToken);
      }, timeOut)
    )
    .catch((error) => console.log(error));
};

export const callCurrentDevice = async (token) => {
  try {
    const result = await fetch(`https://api.spotify.com/v1/me/player/devices`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await result.json();
    return data.devices;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export async function callCurrentTrack(token, setTrack, setPlayer, setToken) {
  await fetch(`https://api.spotify.com/v1/me/player`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token?.tokenId },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((retour) => {
      const listArtist = retour?.item?.artists;
      const artistesNames = [];
      if (listArtist) {
        listArtist.map((artiste) => {
          // Vérifiez si l'objet artiste a la propriété 'name' avant de l'ajouter à la liste
          if (artiste && artiste.name) {
            artistesNames.push(artiste.name);
          }
        });
      }
      setTrack({
        songId: retour?.item?.id,
        name: retour?.item?.name,
        artistes: artistesNames,
        imageURL: retour?.item?.album?.images[0]?.url,
      });
      setPlayer({
        id: retour?.item?.id,
        progress: retour?.progress_ms,
        duration: retour?.item?.duration_ms,
        dateAppel: Date.now().toString(),
        isPlaying: retour?.is_playing,
      });
      if(token?.expired) setToken({ tokenId: token.tokenId, expired: false });
    })
    .catch((error) => {
      toast.error('Device Spotify not found')
      // unothaurized --> expired
      if (error.status === 401 || error.status === 400) {
        setToken({ tokenId: token.tokenId, expired: true });
      }
    });
}
