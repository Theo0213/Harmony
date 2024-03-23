import style from "./informations.module.css";

const Informations = ({imageURL, songName, listArtiste }) => {

  return (
    <div className={style.infos}>
      {imageURL && <img src={imageURL} className={style.image}></img>}
      <div>
        <div className={style.name}>{songName ?? ''}</div>
        <div className={style.artistes}>
          {listArtiste?.map(
            (artiste, i) =>
              artiste + (i + 1 < listArtiste.length ? ", " : "")
          )}
        </div>
      </div>
    </div>
  );
};

export default Informations;
