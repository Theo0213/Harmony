import { useEffect, useState } from "react";

import Footer from "./footer";
import { callCurrentTrack } from "../../src/hooks/hooks";
import { useMainStore } from "../../src/store/store";

export default function Index() {
  const track = useMainStore((state) => state.track);
  const token = useMainStore((state) => state.token);
  const setToken = useMainStore((state) => state.setToken);

  const setTrack = useMainStore((state) => state.setTrack);
  const setPlayer = useMainStore((state) => state.setPlayer);

  useEffect(() => {
    if (token?.tokenId) {
      callCurrentTrack(token, setTrack, setPlayer, setToken);
    }
  }, [token?.tokenId]);

  return track && <Footer track={track} token={token} />;
}
