import styles from "./Find.module.css";
import { Link } from "react-router-dom";
import Store from "./Store";
import { useState, useEffect } from "react";

function FindRandomMain() {
  const [loading, setLoading] = useState(false);
  const [srList, setSrList] = useState([]);

  const getStoreRateList = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/stores/storeratinglist`)
    ).json();
    // console.log(json);
    setLoading(true);
    const randNum = randomNum(json.length);
    // console.log(randNum);
    let randomPickStore = [];
    for (const i in randNum) {
      randomPickStore.push(json[randNum[i] - 1]);
    }
    setSrList(randomPickStore);
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
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.firstLevelDiv}>
          <div>식당 랜덤 보기</div>
          <div className={styles.secondLevelDiv}>
            {srList.map((sr) => (
              <Store
                key={sr.id}
                sname={sr.name}
                cate={sr.category}
                srate={sr.avg_rate}
                link={sr.link}
                loc={sr.loc_quick}
                distance={sr.distance}
                max_rate={sr.max_rate}
                min_rate={sr.min_rate}
                mname={"메뉴1"}
                mrate={3}
              />
            ))}
          </div>
        </div>
      ) : (
        "고르는중..."
      )}
      <div className={styles.firstLevelDiv}>메뉴 랜덤 보기</div>
      <div className={styles.firstLevelDiv}>추가 랜덤</div>
    </div>
  );
}

export default FindRandomMain;
