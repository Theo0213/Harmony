import style from "./redirect.module.css";
import { useRouter } from "next/router";

const Redirect = () => {
  const router = useRouter();

  const redirectToSpotify = () => {
    // Ouvrir une nouvelle fenêtre Spotify
    window.open("https://open.spotify.com", "_blank");
  };

  const svgArrow =
    "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z";

  return (
    <>
      <div className={style.title}>
        Spotify device not found, please open spotify and play a song, then
        retry !
      </div>
      <div className={style.container}>
        <div>
          <button
            className={`${style.button} bg-green-600`}
            type="button"
            onClick={redirectToSpotify}
          >
            Open Spotify
          </button>
          
        </div>
        <svg viewBox="0 0 384 512" className={style.arrow}>
            <path d={svgArrow} />
          </svg>
        <div >
          <button
            className={`${style.button} bg-green-200`}
            type="button"
            // au lieu de reload --> callCurrentTrack
            onClick={router.reload}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  );
};

export default Redirect;
