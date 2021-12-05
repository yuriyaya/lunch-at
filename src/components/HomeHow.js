import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function HomeHow() {
  return (
    <div className={styles.homehow}>
      <Link to={`/log`}>
        <div className={styles.homehowclick}>어땠어?</div>
      </Link>
    </div>
  );
}

export default HomeHow;
