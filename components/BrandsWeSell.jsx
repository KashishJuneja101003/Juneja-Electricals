import BentexLogo from "../src/assets/BentexLogo.webp"
import HavellsLogo from "../src/assets/HavellsLogo.png"
import PlazaCablesLogo from "../src/assets/PlazaCablesLogo.png"
import TibconLogo from "../src/assets/TibconLogo.png"
import UshaLogo from "../src/assets/UshaLogo.png"
import VictoriaLogo from "../src/assets/VictoriaLogo.png"
import ConaLogo from "../src/assets/ConaLogo.png"

const BrandsWeSell = () => {
  return (
    <div id="brands-we-sell">
      <div className="text-2xl font-semibold mb-2 md:text-3xl">
        Brands We Sell
      </div>

      <div
        className="flex flex-col gap-5 p-3 md:flex-row bg-gray-300"
        // style={{ backgroundColor: "#e1d9d9" }}
      >
        <div className="grid grid-cols-3 w-full md:grid-cols-4 md:gap-5.5 justify-between items-center">
            <img className="logo" src={BentexLogo} alt="" />
            <img className="logo" src={HavellsLogo} alt="" />
            <img className="logo" src={PlazaCablesLogo} alt="" />
            <img className="logo" src={TibconLogo} alt="" />
            <img className="logo" src={UshaLogo} alt="" />
            <img className="logo" src={VictoriaLogo} alt="" />
            <img className="logo" src={ConaLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BrandsWeSell;
