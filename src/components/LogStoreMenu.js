import { useState, useEffect } from "react";
import styles from "./Log.module.css";
import LogStoreForm from "./LogStoreForm";
import LogRateForm from "./LogRateForm";

function LogStoreMenu() {
  const [store, setStore] = useState(""); //store name
  const [menu, setMenu] = useState(""); //menu name
  const [storeDisable, setStoreDisable] = useState(0); //store 2nd level UI disable flag
  const [menuDisable, setMenuDisable] = useState(0); //menu 2nd level UI disable flag
  const [newStore, setNewStore] = useState(0); //store information rating form UI flag
  const [newStoreRate, setNewStoreRate] = useState(0); //store rating form UI flag
  const [storeId, setStoreId] = useState(0); //search store id
  const [storelist, setStorelist] = useState([]); // for UI, all store name list
  const [newMenuRate, setNewMenuRate] = useState(0); //menu rating form UI flag
  const [menuId, setMenuId] = useState(0); //search menu id
  const [menulist, setMenulist] = useState([]); // for UI, all menu-store name list
  const [storeData, setStoreData] = useState([]);

  const onChangeStore = (event) => {
    setStore(event.target.value);
  };
  const onChangeMenu = (event) => {
    setMenu(event.target.value);
    setMenuId(findMenuId(event.target.value));
  };

  // ============================ store
  //get store list
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/stores/namelist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStorelist(data);
      });
  }, []);
  const searchStore = async () => {
    // console.log(`${apiHost}/stores/search?name=${store}`);
    if (store !== "") {
      fetch(`${process.env.REACT_APP_API_HOST}/stores/search?name=${store}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setNewStore(1);
            setNewStoreRate(1);
            return;
          }
        })
        .then((data) => {
          if (typeof data !== "undefined") {
            if (data.length === 1) {
              setNewStore(1); //for edit store information
              setNewStoreRate(1);
              setStoreId(data[0]["id"]);
              setStoreData([...data]);
            }
          }
        });
    }
  };
  const storeSearchClick = (event) => {
    if (store === "") return;
    setStoreDisable(0);
    setMenuDisable(1);
    //REST API : search store name
    searchStore();
  };

  // ============================ menu
  //get menu list
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/menus/menustorelist`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMenulist(data);
      });
  }, []);
  const searchMenu = async () => {
    // console.log(`${apiHost}/menu/${menuId}`);
    fetch(`${process.env.REACT_APP_API_HOST}/menu/${menuId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (typeof data !== "undefined") {
          setNewMenuRate(1);
        }
      });
  };
  const menuSearchClick = (event) => {
    if (menu === "") return;
    setStoreDisable(1);
    setMenuDisable(0);
    //REST API 메뉴 이름 검색
    searchMenu();
  };

  const findMenuId = (optionValue) => {
    if (optionValue.indexOf("(") > -1) {
      let [menuStr, storeStr] = optionValue.split("(");
      storeStr = storeStr.slice(0, storeStr.length - 1);
      for (const i in menulist) {
        if (
          menulist[i]["mname"] === menuStr &&
          menulist[i]["name"] === storeStr
        ) {
          return menulist[i]["mid"];
        }
      }
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div
        className={
          storeDisable
            ? styles.firstLevelInputAreaHidden
            : styles.firstLevelInputArea
        }
      >
        <div>오늘 {store ? store : "식당"} 어때?</div>
        <div className={newStore ? styles.divHidden : styles.divDisplay}>
          <input
            value={store}
            onChange={onChangeStore}
            type="search"
            placeholder="식당이름 입력/선택"
            list="storelist"
            disabled={menuDisable ? true : false}
          />
          <datalist id="storelist">
            {storelist.map((i, index) => (
              <option key={index} value={i["name"]}></option>
            ))}
          </datalist>
          <button onClick={storeSearchClick}>찾기</button>
        </div>
        {newStoreRate ? (
          <LogRateForm storeEnable={!storeDisable} id={storeId} />
        ) : null}
        {newStore ? (
          <LogStoreForm id={storeId} name={store} storeData={storeData} />
        ) : null}
      </div>
      <div
        className={
          menuDisable
            ? styles.firstLevelInputAreaHidden
            : styles.firstLevelInputArea
        }
      >
        <div>오늘 {menu ? menu : "메뉴"} 어때?</div>
        <input
          value={menu}
          onChange={onChangeMenu}
          type="search"
          placeholder="메뉴이름 입력"
          list="menulist"
          disabled={storeDisable ? true : false}
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
        <button onClick={menuSearchClick}>찾기</button>
        {newMenuRate ? (
          <LogRateForm storeEnable={!storeDisable} id={menuId} />
        ) : null}
      </div>
    </div>
  );
}

export default LogStoreMenu;
