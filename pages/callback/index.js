import { useEffect, useState } from "react";

import { Loading } from "../../components/loading/loading";

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  localStorage.setItem("access_token", access_token);
  return access_token;
}

export default function Callback() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_ID;
  const [code, setCode] = useState('');
  const [accessToken, setAccessToken] = useState(undefined);

  useEffect(() => {
    if (window.location.search.length > 0) {
      const params = new URLSearchParams(window.location.search);
      setCode(params.get("code"));
    }
  });

  useEffect(() => {
    async function getToken() {
      const token = await getAccessToken(clientId, code);
      setAccessToken(token);
    }
    if (code) {
      getToken();
    }
  }, [code]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
  }, [accessToken]);

  if (accessToken !== undefined) {
    window.location.replace("/");
  } else {
    return <Loading />;
  }
}
