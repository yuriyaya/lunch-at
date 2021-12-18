import HomeWhat from "../components/HomeWhat";
import FindRandomMain from "../components/FindRandomMain";
import FindSearchStore from "../components/FindSearchStore";
import FindSearchMenu from "../components/FindSearchMenu";

function Find() {
  return (
    <div>
      <HomeWhat />
      <FindSearchStore />
      <FindSearchMenu />
      <FindRandomMain />
    </div>
  );
}

export default Find;
