import { Link } from "react-router-dom";
import ceilingFan from "../src/assets/Ceiling-fan-2.png";
import iron from "../src/assets/iron-1.jpeg";
import Bulbs from "../src/assets/Bulbs-1.jpg";
import Switch from "../src/assets/Switch-1.jpg";
import Wires from "../src/assets/Wires-1.jpg";
import PVCPipes from "../src/assets/PVC Pipes.jpeg";

function ExploreOurProducts() {
  return (
    <div className="my-10">
      {/* <!-- Upper Div --> */}
      <div className="text-2xl font-semibold mb-2 md:text-3xl">
        Explore Our Products
      </div>

      {/* <!-- Lower Div --> */}
      <div
        className="flex flex-col gap-4 w-full p-3 lg:flex-row lg:justify-between"
        style={{ backgroundColor: "#e1d9d9" }}
      >
        {/* <!-- Card 1: Fans --> */}
        <Link to="/Products/Fans" className="lg:w-[35%]">
        <div
          className="group flex flex-col bg-white h-full p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl "
        >
          <img
            src={ceilingFan}
            alt=""
            className="rounded-2xl group-hover:scale-102"
          />
          <p className="text-xl font-semibold group-hover:translate-y-1">Fans</p>
        </div>
        </Link>

        {/* <!-- 4 Product Cards --> */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:gap-16 sm:justify-between lg:flex-col lg:w-[25%] lg:justify-around"
        >
          {/* <!-- Upper Cards --> */}
          <div className="flex justify-between sm:w-[50%] lg:w-[100%] lg:gap-4">
            {/* <!-- Card 2: Irons --> */}
            <Link to="/Products/Irons" className="lg:w-[35%]">
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src={iron}
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Irons
              </p>
            </div>
            </Link>

            {/* <!-- Card 3: Bulbs --> */}
            <Link to="/Products/Lights">
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src= {Bulbs}
                alt=""
                className="h-18 rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Bulbs
              </p>
            </div>
            </Link>
          </div>

          {/* <!-- Lower Cards --> */}
          <div className="flex justify-between sm:w-[50%] lg:w-[100%] lg:gap-4">
            {/* <!-- Card 4: Switches --> */}
            <Link to="/Products/Switches" className="lg:w-[35%]">
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src={Switch}
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Switches
              </p>
            </div>
            </Link>
            

            {/* <!-- Card 5: Wires --> */}
            <Link to="/Products/Wires">
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src={Wires}
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Wires
              </p>
            </div>
            </Link>
          </div>
        </div>

        {/* <!-- Card 6: PVC Pipes --> */}
        <Link to="/Products/Pipes" className="lg:w-[35%]">
        <div
          className="group flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
        >
          <img
            src={PVCPipes}
            alt=""
            className="h-40 sm:h-72 w-full rounded-2xl group-hover:scale-102"
          />
          <p className="text-xl font-semibold group-hover:translate-y-1">
            PVC Pipes
          </p>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default ExploreOurProducts;