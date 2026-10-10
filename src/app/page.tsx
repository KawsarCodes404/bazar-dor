import AllProducts from "@/component/AllProducts";
import Banner from "@/component/Banner";
// import Marquee from "@/component/Marquee";
import TodayDecreasedSectionGrid from "@/component/TodayDecreasedSectionGrid";
import TodayIncreasedSectionGrid from "@/component/TodayIncreasedSectionGrid";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <TodayIncreasedSectionGrid />
      <TodayDecreasedSectionGrid />
      <AllProducts />
    </div>
  );
}
