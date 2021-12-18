import HomeWhat from "../components/HomeWhat";
import FindRandomShort from "../components/FindRandomShort";
import FindSearchStoreShort from "../components/FindSearchStoreShort";
import FindSearchMenuShort from "../components/FindSearchMenuShort";

function Find() {
  return (
    <div>
      <HomeWhat />
      <FindSearchStoreShort />
      <FindSearchMenuShort />
      <FindRandomShort />
    </div>
  );
}

export default Find;
