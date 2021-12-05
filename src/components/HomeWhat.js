import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function HomeWhat() {
  return (
    <div className={styles.homewhat}>
      <Link to={`/find`}>
        <div className={styles.homewhatclick}>뭐 먹지?</div>
      </Link>
    </div>
  );
}

export default HomeWhat;
