import styles from "./Find.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FindSearchStoreShort() {
  return (
    <div>
      <Link to={`/find/stores/search`}>
        <div className={styles.searchTitle}>
          <FontAwesomeIcon icon={faSearch} />
          <b> 식당 검색 </b>
          <span style={{ fontSize: "small" }}>바로가기</span>
        </div>
      </Link>
    </div>
  );
}

export default FindSearchStoreShort;
