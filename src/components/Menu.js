import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

function Menu({ id, mname, rate, name, cate, link, loc, distance }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.mname}>
        <b>{mname}</b>
      </div>
      <div className={styles.empty}></div>
      <div className={styles.namecate}>
        {name}({cate})
      </div>
      <div className={styles.rate}>평점: {rate ? rate.toFixed(1) : "-"}</div>
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

export default Menu;
