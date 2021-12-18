import styles from "./Store.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLink,
  faWalking,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className={styles.rate}>
        <FontAwesomeIcon icon={faStar} /> {srate ? srate.toFixed(1) : "-"}
      </div>
      <div className={styles.link}>
        <a href={link} rel="noopener noreferrer" target="_blank">
          <FontAwesomeIcon icon={faLink} />
          <b> 링크</b>
        </a>
      </div>
      <div className={styles.loc}>
        <FontAwesomeIcon icon={faMapMarkerAlt} /> {loc}
      </div>
      <div className={styles.dist}>
        <FontAwesomeIcon icon={faWalking} /> 약 {distance}분
      </div>
    </div>
  );
}

export default Store;
