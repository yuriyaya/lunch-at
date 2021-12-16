import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function HomeFooter() {
  return (
    <div className={styles.homefooter}>
      <a href="https://github.com/yuriyaya/lunch-at#readme" target="_blank">
        about
      </a>
    </div>
  );
}

export default HomeFooter;
