import styles from "./FindSearch.module.css";
import { useState, useEffect } from "react";
import Store from "./Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FindSearchStore() {
  const [store, setStore] = useState(""); //store name
  const [category, setCategory] = useState(""); //store category
  const [distance, setDistance] = useState(""); //store distance
  const [rate, setRate] = useState(""); //store rating
  const [storelist, setStorelist] = useState([]); // for UI, all store name list
  const [storeData, setStoreData] = useState([]);
  const [cateList, setCateList] = useState([]);

  const onChangeStore = (event) => {
    setStore(event.target.value);
    setCategory("");
    setDistance("");
    setRate("");
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
    setStore("");
  };

  const onChangeDistance = (event) => {
    setDistance(event.target.value);
    setStore("");
  };

  const onChangeRate = (event) => {
    setRate(event.target.value);
    setStore("");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/stores/namelist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStorelist(data);
      });

    fetch(`${process.env.REACT_APP_API_HOST}/stores/categorylist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCateList(data);
      });
  }, []);

  const storeSearchClick = (event) => {
    if (store === "" && category === "" && distance === "" && rate === "")
      return;
    //REST API : search store name
    searchStore();
  };

  const searchStore = async () => {
    let queryStr = "";
    if (store !== "") {
      queryStr = `${process.env.REACT_APP_API_HOST}/stores/search?name=${store}`;
    } else if (category !== "" || distance !== "" || rate !== "") {
      queryStr = `${process.env.REACT_APP_API_HOST}/stores/search?`;
      queryStr =
        queryStr +
        (category !== "" ? `category=${category}` : "") +
        (category !== "" && distance !== "" ? "&" : "") +
        (distance !== "" ? `distance=${distance}` : "") +
        ((distance !== "" && rate !== "") || (category !== "" && rate !== "")
          ? "&"
          : "") +
        (rate !== "" ? `ratings=${rate}` : "");
    } else {
    }
    // console.log(queryStr);
    if (queryStr !== "") {
      fetch(queryStr)
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
        <b> ?????? ??????</b>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.labelname}>?????? ??????</div>
        <div className={styles.inname}>
          <input
            value={store}
            onChange={onChangeStore}
            type="search"
            placeholder="???????????? ??????/??????"
            list="storelist"
          />
          <datalist id="storelist">
            {storelist.map((i) => (
              <option key={i["id"]} value={i["name"]}></option>
            ))}
          </datalist>
        </div>
        <div className={styles.labelcate}>?????? ??????</div>
        <div className={styles.incate}>
          <input
            value={category}
            onChange={onChangeCategory}
            type="search"
            placeholder="?????? ?????? ??????/??????"
            list="catelist"
          />
          <datalist id="catelist">
            {cateList.map((i, index) => (
              <option key={index} value={i["category"]}></option>
            ))}
          </datalist>
        </div>
        <div className={styles.labeldist}>????????? ??????(???)</div>
        <div className={styles.indist}>
          <input
            value={distance}
            onChange={onChangeDistance}
            type="number"
            placeholder="????????? ????????? ??????, (??????)"
          ></input>
        </div>
        <div className={styles.labelrate}>??????</div>
        <div className={styles.inrate}>
          <input
            value={rate}
            onChange={onChangeRate}
            type="number"
            placeholder="?????? ??????"
          ></input>
        </div>
        <div className={styles.empty}></div>
        <div className={styles.btn}>
          <button className={styles.buttonGen} onClick={storeSearchClick}>
            ??????
          </button>
        </div>
      </div>
      <div className={styles.secondLevelDiv}>
        <div>
          {storeData.length
            ? storeData.map((sr) => (
                <Store
                  key={sr.id}
                  id={sr.id}
                  sname={sr.name}
                  cate={sr.category}
                  srate={sr.avg_rating}
                  link={sr.link}
                  loc={sr.loc_quick}
                  distance={sr.distance}
                  max_rate={sr.max_rate}
                  min_rate={sr.min_rate}
                />
              ))
            : "?????? ????????? ????????????"}
        </div>
      </div>
    </div>
  );
}

export default FindSearchStore;
