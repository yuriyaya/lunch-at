import styles from "./StoreFull.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeWhat from "../components/HomeWhat";

function StoreFull() {
  const { sid } = useParams();
  return (
    <div>
      <HomeWhat />
      <div className={styles.gridContainer}>{sid} store full component</div>
    </div>
  );
}

export default StoreFull;
