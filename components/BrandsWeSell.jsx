import React from "react";

const BrandsWeSell = () => {
  return (
    <div id="brands-we-sell">
      <div className="text-2xl font-semibold mb-2 md:text-3xl">
        Brands We Sell
      </div>

      <div
        className="flex flex-col gap-5 p-3 md:flex-row"
        style={{ backgroundColor: "#e1d9d9" }}
      >
        <div className="grid grid-cols-3 w-full md:grid-cols-7 justify-between items-center">
            <img className="logo" src="./src/assets/BentexLogo.webp" alt="" />
            <img className="logo" src="./src/assets/ConaLogo.png" alt="" />
            <img className="logo" src="./src/assets/HavellsLogo.png" alt="" />
            <img className="logo" src="./src/assets/PlazaCablesLogo.png" alt="" />
            <img className="logo" src="./src/assets/TibconLogo.png" alt="" />
            <img className="logo" src="./src/assets/UshaLogo.png" alt="" />
            <img className="logo" src="./src/assets/VictoriaLogo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BrandsWeSell;
