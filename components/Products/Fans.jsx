import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const Fans = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({});

  async function getData() {
    try {
      const category = "Fans";
      const resp = await axios.get(`${BASE_URL}/products/${category}`);
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
      if (!prev[idx]) return prev; // Don’t decrement below 0
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
        className="cursor-pointer text-white bg-emerald-700 px-3 py-2 rounded-2xl active:scale-90"
      >
        Get Data
      </button>

      {/* Cards */}
      <div className="flex flex-wrap justify-between bg-gray-300 rounded-2xl p-5 pb-0">
        {/* {data.map((elem, idx) => (
          <div
            key={idx}
            className="transition-all w-60 mb-5 bg-gray-100 rounded-2xl p-2 hover:scale-105"
          >
            <img
              src={elem.download_url}
              alt={elem.author}
              className="rounded-2xl h-40 w-full object-cover"
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
                  className="fa-solid fa-minus cursor-pointer"
                  onClick={() => decrementCount(idx)}
                ></i>
                <p>{counts[idx] || 0}</p>
                <i
                  className="fa-solid fa-plus cursor-pointer"
                  onClick={() => incrementCount(idx)}
                ></i>
              </div>
            </div>
          </div>
        ))} */}
        {
          console.log("Here")
        }
      </div>
    </div>
  );
};

export default Fans;
