import styles from "./StoreFull.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function StoreFullMenuRatings({ mrData }) {
  return (
    <div>
      {mrData.map((mr) => (
        <div key={mr.name}>
          <div className={styles.menuName}>
            <b>{mr.name}</b>
            <br />
            <FontAwesomeIcon icon={faStar} /> {mr.avg} (총 {mr.cnt}개의 평가)
            <br />
            <FontAwesomeIcon icon={faCaretUp} /> {mr.max} /{" "}
            <FontAwesomeIcon icon={faCaretDown} /> {mr.min}
          </div>
          <table className={styles.borderTable}>
            {mr.ratelist.map((c, index) => (
              <tbody key={index}>
                <tr>
                  <td className={styles.rateCell}>{c.rate}</td>
                  <td className={styles.borderTableCell}>{c.comment}</td>
                  <td className={styles.dateCell}>{c.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <br />
        </div>
      ))}
    </div>
  );
}

export default StoreFullMenuRatings;
