import { playOther } from "../../../src/hooks/hooks";
import style from "./popUp.module.css";
import { useMainStore } from "../../../src/store/store";

const PopUpUsers = ({ user }) => {
  const track = user?.player?.track;
  const connectPath =
    "M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z";

  const token = useMainStore((state) => state.token);

  const setTrack = useMainStore((state) => state.setTrack);
  const setPlayer = useMainStore((state) => state.setPlayer);

  const connect = () => {
    playOther(token, user?.player, setTrack, setPlayer);
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>{track?.name}</h2>

      <p className={style.artistes}>
        {track.artistes?.map(
          (artiste, i) => artiste + (i + 1 < track.artistes.length ? ", " : "")
        )}
      </p>

      <div className={style.bottomContainer}>
        <img src={track.imageURL} className={style.image}></img>

        <button
          onClick={() => connect()}
          type="button"
          className={style.buttonMain}
        >
          <svg viewBox="0 0 640 512" className={style.connectIcon}>
            <path d={connectPath} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PopUpUsers;
