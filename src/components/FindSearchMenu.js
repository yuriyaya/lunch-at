import styles from "./FindSearchMenu.module.css";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function FindSearchMenu() {
  const [menu, setMenu] = useState(""); //store name
  const [rate, setRate] = useState(""); //store rating
  const [menulist, setMenulist] = useState([]); // for UI, all menu name list
  const [mrList, setMrList] = useState([]);

  const onChangeMenu = (event) => {
    setMenu(event.target.value);
  };

  const onChangeRate = (event) => {
    setRate(event.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/menus/menustorelist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMenulist(data);
      });
  }, []);

  const menuSearchClick = (event) => {
    if (menu === "" && rate === "") return;
    //REST API : search store name
    searchMenu();
  };

  const searchMenu = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/menus/menuratinglist`)
    ).json();
    // console.log(json);
    let searchResult = [];
    for (const i in json) {
      //menu search
      // console.log(json[i]);
      if (menu !== "" && rate !== "") {
        //both search
        if (
          json[i]["mname"].includes(menu) &&
          json[i]["avg_rate"] >= parseFloat(rate)
        ) {
          searchResult.push(json[i]);
        }
      } else if (menu !== "" && rate === "") {
        //rate only search
        if (json[i]["mname"].includes(menu)) {
          searchResult.push(json[i]);
        }
      } else if (menu === "" && rate !== "") {
        // menu only search
        if (json[i]["avg_rate"] >= parseFloat(rate)) {
          searchResult.push(json[i]);
        }
      }
    }
    // console.log(searchResult);
    setMrList(searchResult);
  };

  return (
    <div>
      <div className={styles.searchTitle}>
        <FontAwesomeIcon icon={faSearch} />
        <b> 메뉴 검색</b>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.labelname}>이름 검색</div>
        <div className={styles.inname}>
          <input
            value={menu}
            onChange={onChangeMenu}
            type="search"
            placeholder="메뉴이름 입력/선택"
            list="menulist"
          />
          <datalist id="menulist">
            {menulist.map((i) => (
              <option
                key={i["mid"]}
                id={i["mid"]}
                value={i["mname"] + "(" + i["name"] + ")"}
              ></option>
            ))}
          </datalist>
        </div>
        <div className={styles.labelrate}>평점</div>
        <div className={styles.inrate}>
          <input
            value={rate}
            onChange={onChangeRate}
            type="number"
            placeholder="최소 평점"
          ></input>
        </div>
        <div className={styles.empty}></div>
        <div className={styles.btn}>
          <button className={styles.buttonGen} onClick={menuSearchClick}>
            검색
          </button>
        </div>
      </div>
      <div className={styles.secondLevelDiv}>
        <div>
          {mrList.length
            ? mrList.map((mr) => (
                <Menu
                  key={mr.id}
                  id={mr.store_id}
                  mname={mr.mname}
                  rate={mr.avg_rate}
                  name={mr.name}
                  cate={mr.category}
                  link={mr.link}
                  loc={mr.loc_quick}
                  distance={mr.distance}
                  max_rate={mr.max_rate}
                  min_rate={mr.min_rate}
                />
              ))
            : "검색 결과가 없습니다"}
        </div>
      </div>
    </div>
  );
}

export default FindSearchMenu;
