import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function HomeFooter() {
  return (
    <div className={styles.homefooter}>
      <div>
        <a href="https://github.com/yuriyaya/lunch-at#readme" target="_blank">
          <b>about</b>
        </a>
      </div>
      <div>version: 0.2.0</div>
    </div>
  );
}

export default HomeFooter;
