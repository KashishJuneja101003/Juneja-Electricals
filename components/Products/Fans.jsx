import axios from "axios";
import { useState } from "react";

const Fans = () => {
  const [data, setData] = useState([]);
  let [counts, setCounts] = useState({});

  async function getData() {
    try {
      let resp = await axios.get("https://picsum.photos/v2/list");
      setData(resp.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  function incrementCount(idx) {
    setCounts((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));
  }

  function decrementCount(idx) {
    setCounts((prev) => {
      if (!prev[idx]) return prev; // Don't decrement below 0
      return {
        ...prev,
        [idx]: prev[idx] - 1,
      };
    });
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl text-center uppercase text-gray-800">Fans</h1>
      <button
        onClick={getData}
        className="cursor-pointer text-white bg-emerald-700 px-3 py-2 rounded-2xl active:scale-90 "
      >
        Get Data
      </button>
      {/* Cards */}
      <div className="flex flex-wrap justify-between bg-gray-300 rounded-2xl p-5 pb-0">
        {data.map(function (elem, idx) {
          return (
            <div
              key={idx}
              className="transition-all w-60  mb-5 bg-gray-100 rounded-2xl p-2 hover:scale-105"
            >
              <img
                src={elem.download_url}
                alt=""
                className="rounded-2xl h-40"
              />
              <div className="flex justify-between">
                <div>
                  <h1 className="font-semibold text-lg">{elem.author}</h1>
                  <h3 className="text-emerald-900 text-md">$ {elem.width}</h3>
                  <p className="text-sm">
                    Company: USHA <br />
                    RPM: 400
                  </p>
                </div>

                <div className="flex flex-col items-center my-auto mr-2 bg-cyan-700 p-2 text-white rounded-2xl">
                  <i
                    class="fa-solid fa-minus cursor-pointer"
                    onClick={() => decrementCount(idx)}
                  ></i>
                  <p>{counts[idx] || 0}</p>
                  <i
                    class="fa-solid fa-plus cursor-pointer"
                    onClick={() => incrementCount(idx)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fans;
