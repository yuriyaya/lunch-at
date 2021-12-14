import styles from "./Store.module.css";
import { Link } from "react-router-dom";

function Store({
  id,
  sname,
  cate,
  srate,
  link,
  loc,
  distance,
  max_rate,
  min_rate,
  mname,
  mrate,
}) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.name}>
        <Link to={`/find/store/${id}`}>
          <b>{sname}</b>
        </Link>
      </div>
      <div className={styles.empty}></div>
      <div className={styles.cate}>{cate}</div>
      <div className={styles.rate}>평점: {srate ? srate.toFixed(1) : "-"}</div>
      <div className={styles.link}>
        <a href={link} rel="noopener noreferrer" target="_blank">
          <b>&#127968; 링크</b>
        </a>
      </div>
      <div className={styles.loc}>{loc}</div>
      <div className={styles.dist}>약 {distance}분</div>
    </div>
  );
}

export default Store;
