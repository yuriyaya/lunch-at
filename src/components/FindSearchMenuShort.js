import styles from "./Find.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FindSearchMenu() {
  return (
    <div>
      <div className={styles.searchTitle}>
        <FontAwesomeIcon icon={faSearch} />
        <b> 메뉴 검색 </b>
        <span style={{ fontSize: "small" }}>바로가기</span>
      </div>
    </div>
  );
}

export default FindSearchMenu;
