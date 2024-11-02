import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { london, berlin, madrid } from "../../assets/index.js";
// import "./featured.css";

export default function Featured() {
  const [data, setData] = useState(null);
  const citiesThumbnail = [berlin, madrid, london];
  console.log("properties data:", data);

  useEffect(() => {
    async function fetchData(url) {
      const { data } = await axios.get(url);
      setData(data.cityCount);
    }

    fetchData(
      "http://localhost:8080/api/hotels/countByCity?cities=berlin,madrid,london"
    );
  }, []);

  if (!data) {
    return <h1>Loading, Please wait...</h1>;
  }

  return (
    <>
      {!data ? (
        "Loading, Please wait..."
      ) : (
        <div className="w-full h-[350px] flex gap-x-8 py-8 ">
          <div className="w-full h-full relative cursor-pointer rounded-xl group">
            <img
              src={citiesThumbnail[0]}
              alt=""
              className="min-w-full h-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-y-2 absolute bg-neutral-700/45 group-hover:bg-neutral-700/55 w-full h-full inset-0 justify-end p-4 rounded-xl">
              <h1 className="text-neutral-100 text-2xl font-bold">Berlin</h1>
              <h2 className="text-neutral-100 text-xl font-semibold">
                {data[0]} properties
              </h2>
            </div>
          </div>
          <div className="w-full h-full relative cursor-pointer rounded-xl group">
            <img
              src={citiesThumbnail[1]}
              alt=""
              className="min-w-full h-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-y-2 absolute bg-neutral-700/45 group-hover:bg-neutral-700/55 w-full h-full inset-0 justify-end p-4 rounded-xl">
              <h1 className="text-neutral-100 text-2xl font-bold">Madrid</h1>
              <h2 className="text-neutral-100 text-xl font-semibold">
                {data[1]} properties
              </h2>
            </div>
          </div>
          <div className="w-full h-full relative cursor-pointer rounded-xl group">
            <img
              src={citiesThumbnail[2]}
              alt=""
              className="min-w-full h-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-y-2 absolute bg-neutral-700/45 group-hover:bg-neutral-700/55 w-full h-full inset-0 justify-end p-4 rounded-xl">
              <h1 className="text-neutral-100 text-2xl font-bold">London</h1>
              <h2 className="text-neutral-100 text-xl font-semibold">
                {data[2]} properties
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
