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
        <div
          className="group flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl lg:w-[35%]"
        >
          <img
            src="./src/assets/Ceiling-fan-2.png"
            alt=""
            className="rounded-2xl group-hover:scale-102"
          />
          <p className="text-xl font-semibold group-hover:translate-y-1">Fans</p>
        </div>

        {/* <!-- 4 Product Cards --> */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:gap-16 sm:justify-between lg:flex-col lg:w-[25%] lg:justify-around"
        >
          {/* <!-- Upper Cards --> */}
          <div className="flex justify-between sm:w-[50%] lg:w-[100%] lg:gap-4">
            {/* <!-- Card 2: Irons --> */}
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src="./src/assets/iron-1.jpeg"
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Irons
              </p>
            </div>

            {/* <!-- Card 3: Bulbs --> */}
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src="./src/assets/Bulbs-1.jpg"
                alt=""
                className="h-18 rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Bulbs
              </p>
            </div>
          </div>

          {/* <!-- Lower Cards --> */}
          <div className="flex justify-between sm:w-[50%] lg:w-[100%] lg:gap-4">
            {/* <!-- Card 4: Switches --> */}
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src="./src/assets/Switch-1.jpg"
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Switches
              </p>
            </div>

            {/* <!-- Card 5: Wires --> */}
            <div
              className="group w-32 flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl"
            >
              <img
                src="./src/assets/Wires-1.jpg"
                alt=""
                className="rounded-2xl group-hover:scale-102"
              />
              <p className="text-xl font-semibold group-hover:translate-y-1">
                Wires
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Card 6: PVC Pipes --> */}
        <div
          className="group flex flex-col bg-white p-3 justify-around rounded-2xl items-center cursor-pointer hover:shadow-xl lg:w-[35%]"
        >
          <img
            src="./src/assets/PVC Pipes.jpeg"
            alt=""
            className="h-40 sm:h-72 w-full rounded-2xl group-hover:scale-102"
          />
          <p className="text-xl font-semibold group-hover:translate-y-1">
            PVC Pipes
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExploreOurProducts;