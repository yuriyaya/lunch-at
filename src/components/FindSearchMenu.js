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
      let menuStr = "";
      if (menu.indexOf("(") > -1) {
        menuStr = menu.split("(")[0];
      } else {
        menuStr = menu;
      }
      if (menuStr !== "" && rate !== "") {
        //both search
        if (
          json[i]["mname"].includes(menuStr) &&
          json[i]["avg_rate"] >= parseFloat(rate)
        ) {
          searchResult.push(json[i]);
        }
      } else if (menuStr !== "" && rate === "") {
        //menu only search
        if (json[i]["mname"].includes(menuStr)) {
          searchResult.push(json[i]);
        }
      } else if (menuStr === "" && rate !== "") {
        // rate only search
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
        <b> ?????? ??????</b>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.labelname}>?????? ??????</div>
        <div className={styles.inname}>
          <input
            value={menu}
            onChange={onChangeMenu}
            type="search"
            placeholder="???????????? ??????/??????"
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
          <button className={styles.buttonGen} onClick={menuSearchClick}>
            ??????
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
            : "?????? ????????? ????????????"}
        </div>
      </div>
    </div>
  );
}

export default FindSearchMenu;
