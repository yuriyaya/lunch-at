import { useState, useEffect } from "react";
import styles from "./Log.module.css";
import LogStoreForm from "../components/LogStoreForm";
import LogStoreRateForm from "../components/LogStoreRateForm";

function LogStore() {
  const [store, setStore] = useState("");
  const [storeExist, setStoreExist] = useState(0);
  const [storeSearch, setStoreSearch] = useState([]);
  const onChange = (event) => {
    setStore(event.target.value);
  };
  const apiHost = process.env.REACT_APP_API_HOST;
  const getStore = async () => {
    // console.log(`${apiHost}/search?name=${store}`);
    //식당 있으면 1, 식당 없으면 2, 식당이 두개 이상이면 3
    fetch(`${apiHost}/search?name=${store}`)
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          console.log(response.status);
          setStoreExist(2);
        }
      })
      .then((data) => setStoreSearch(data));
  };
  const storeNextClick = (event) => {
    if (store === "") return;
    //REST API 식당 있는지 확인
    getStore();
  };
  function SelectForm() {
    if (storeExist === 1) {
      return <LogStoreRateForm />;
    } else if (storeExist === 2) {
      return <LogStoreForm />;
    } else {
      return null;
    }
  }

  return (
    <div>
      <div className={styles.storeInputArea}>
        <div>오늘 {store ? store : "식당"} 어때?</div>
        <input
          value={store}
          onChange={onChange}
          type="text"
          placeholder="식당이름 입력"
        />
        <button onClick={storeNextClick}>찾기</button>
      </div>
      <SelectForm />
    </div>
  );
}

export default LogStore;
