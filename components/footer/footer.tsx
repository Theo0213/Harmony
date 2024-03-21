import Information from "./subComponent/informations";
import Player from "./subComponent/player";
import { Token } from "@types";
import { Track } from "@prisma/client";
import Volume from "./subComponent/volume";
import { savePlayer } from "@utils";
import style from "./footer.module.css";
import { useEffect } from "react";
import { useMainStore } from "../../src/store/store";

const Footer = ({ track, token }: { track: Track; token: Token }) => {
  const userStore = useMainStore((state) => state.user);

  const player = useMainStore((state) => state.player);

  useEffect(() => {
    
    const upsertPlayer = async () => {
      try {
        if (token?.tokenId && userStore?.id && player)
          await savePlayer(userStore, track, player);
      } catch (error) {
        console.error(
          "Erreur lors de l'insertion/upsert de l'utilisateur : ",
          error
        );
      }
    };
    // ne pas save si pas de loc
    if (track?.songId) upsertPlayer();
  }, [player, track]);

  return (
    <div className={style.container}>
      <Information
        imageURL={track?.imageURL}
        songName={track?.name}
        listArtiste={track?.artistes}
      />

      <Player track={track} token={token} />
      <Volume />
    </div>
  );
};

export default Footer;
