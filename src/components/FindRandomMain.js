import styles from "./Find.module.css";
import { Link } from "react-router-dom";
import Store from "./Store";
import Menu from "./Menu";
import { useState, useEffect } from "react";

function FindRandomMain() {
  const [loading, setLoading] = useState(false);
  const [srList, setSrList] = useState([]);
  const [mrList, setMrList] = useState([]);

  const getStoreRateList = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/stores/storeratinglist`)
    ).json();
    // console.log(json);
    // setLoading(true);
    const randNum = randomNum(json.length);
    // console.log(randNum);
    let randomPickStore = [];
    for (const i in randNum) {
      randomPickStore.push(json[randNum[i] - 1]);
    }
    setSrList(randomPickStore);
  };

  const getMenuRateList = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/menus/menuratinglist`)
    ).json();
    // console.log(json);
    setLoading(true);
    const randNum = randomNum(json.length);
    // console.log(randNum);
    let randomPickStore = [];
    for (const i in randNum) {
      randomPickStore.push(json[randNum[i] - 1]);
    }
    setMrList(randomPickStore);
  };

  const randomNum = (max) => {
    let rand = [];
    let i = 0;
    while (i < 3) {
      let n = Math.floor(Math.random() * max) + 1;
      if (rand.every((e) => n !== e)) {
        rand.push(n);
        i++;
      }
    }
    return rand;
  };

  useEffect(() => {
    getStoreRateList();
    getMenuRateList();
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.firstLevelDiv}>
          <div>
            &#127922;<b>식당 랜덤 보기</b>
          </div>
          <div className={styles.randomDescription}>
            입력된 모든 식당 중 랜덤으로 3곳을 선정하여 표시합니다.
          </div>
          <div className={styles.secondLevelDiv}>
            {srList.map((sr) => (
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
            ))}
          </div>
        </div>
      ) : (
        "고르는중..."
      )}
      {loading ? (
        <div className={styles.firstLevelDiv}>
          <div>
            &#127922;<b>메뉴 랜덤 보기</b>
          </div>
          <div className={styles.randomDescription}>
            입력된 모든 메뉴 중 랜덤으로 3가지를 선정하여 표시합니다.
          </div>
          <div className={styles.secondLevelDiv}>
            {mrList.map((mr) => (
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
            ))}
          </div>
        </div>
      ) : (
        "고르는중..."
      )}
      <div className={styles.firstLevelDiv}>
        또 다른 랜덤이 필요하다면? (준비중)
      </div>
    </div>
  );
}

export default FindRandomMain;
