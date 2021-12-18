import styles from "./FindSearch.module.css";
import { useState, useEffect } from "react";
import Store from "./Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FindSearchStore() {
  const [store, setStore] = useState(""); //store name
  const [storelist, setStorelist] = useState([]); // for UI, all store name list
  const [nameSearch, setNameSearch] = useState(true);
  const [storeId, setStoreId] = useState(0); //search store id
  const [storeData, setStoreData] = useState([]);

  const onChangeStore = (event) => {
    setStore(event.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/stores/namelist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStorelist(data);
      });
  }, []);

  const storeSearchClick = (event) => {
    if (store === "") return;
    //REST API : search store name
    searchStore();
  };

  const searchStore = async () => {
    // console.log(`${apiHost}/stores/search?name=${store}`);
    if (store !== "") {
      fetch(`${process.env.REACT_APP_API_HOST}/stores/search?name=${store}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return;
          }
        })
        .then((data) => {
          if (typeof data !== "undefined") {
            setStoreData([...data]);
          }
        });
    }
  };

  return (
    <div>
      <div className={styles.searchTitle}>
        <FontAwesomeIcon icon={faSearch} />
        <b> 식당 검색</b>
      </div>
      <div className={styles.secondLevelDiv}>
        <span>이름 검색</span>
        <input
          value={store}
          onChange={onChangeStore}
          type="search"
          placeholder="식당이름 입력/선택"
          list="storelist"
          disabled={nameSearch ? false : true}
        />
        <datalist id="storelist">
          {storelist.map((i) => (
            <option key={i["id"]} value={i["name"]}></option>
          ))}
        </datalist>
        <button className={styles.buttonGen} onClick={storeSearchClick}>
          검색
        </button>
        <div>
          {storeData.length
            ? storeData.map((sr) => (
                <Store
                  key={sr.id}
                  id={sr.id}
                  sname={sr.name}
                  cate={sr.category}
                  srate={sr.avg_rate}
                  link={sr.link}
                  loc={sr.loc_quick}
                  distance={sr.distance}
                  max_rate={sr.max_rate}
                  min_rate={sr.min_rate}
                />
              ))
            : "검색 결과가 없습니다"}
        </div>
      </div>
    </div>
  );
}

export default FindSearchStore;
