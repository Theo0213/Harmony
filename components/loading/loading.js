import style from "./loading.module.css";

export function Loading() {
  return (
    <div className={style.center}>
      <div className={style.loader}></div>
    </div>
  );
}
