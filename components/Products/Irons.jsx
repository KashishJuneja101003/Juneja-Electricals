import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://juneja-electricals-backend.onrender.com";

const Irons = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({});

  async function getData() {
    try {
      const category = "Irons";
      const resp = await axios.get(`${BASE_URL}/products/${category}`);
      setData(resp.data);
      console.log("Data", resp.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
      <h1 className="text-3xl text-center uppercase mb-4 text-rose-800">
        Irons
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap justify-between bg-gray-300 rounded-2xl p-5 pb-0">
        {data.map((elem, idx) => (
          <div
            key={idx}
            className="transition-all w-66 mb-5 bg-gray-100 rounded-2xl p-2 pb-0 hover:scale-105"
          >
            <img
              src={elem.imageUrl}
              alt="Iron-Image"
              className="rounded-2xl h-50 w-full object-cover"
            />
            <div className="flex justify-between">
              <div className="space-y-1">
                <h1 className="font-semibold text-lg">{elem.name}</h1>
                <h2 className="font-semibold">Brand: {elem.brand}</h2>
                <h3 className="text-emerald-900 text-md">₹ {elem.price}</h3>
                {elem.description.split(".").map((word, i) => (
                  <span key={i}>
                    {word}
                    <br />
                  </span>
                ))}
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
        ))}
      </div>
    </div>
  );
};

export default Irons;
