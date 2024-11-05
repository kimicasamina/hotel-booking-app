import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { room, apartment, resort } from "../../assets/index.js";
// import "./propertyList.css";
import axios from "axios";

export default function PropertyList() {
  // const { data, loading, error, reFetch } = useFetch(
  //   "http://localhost:8080/api/hotels/countByType"
  // );
  const [data, setData] = useState(null);

  const images = [room, resort, apartment];

  console.log("properties data:", data);

  useEffect(() => {
    async function fetchData(url) {
      const { data } = await axios.get(url);
      setData(data.properties);
    }

    fetchData("/api/hotels/countByType");
  }, []);

  return (
    <div className="w-full min-h-[350px] flex gap-x-8 py-8">
      {!data
        ? "loading"
        : data &&
          images.map((img, i) => (
            <div
              className="w-full h-full relative cursor-pointer rounded-xl group"
              key={i}
            >
              <img
                src={img}
                alt=""
                className="min-w-full h-full object-cover rounded-xl"
              />
              <div className="flex flex-col gap-y-2 absolute bg-neutral-700/45 group-hover:bg-neutral-700/55 w-full h-full inset-0 justify-end p-2 rounded-xl">
                <h1 className="text-neutral-100 text-2xl font-bold">
                  {data[i].type}
                </h1>
                <h2 className="text-neutral-100 text-xl font-semibold">
                  {data[i].count} {data[i].type}
                </h2>
              </div>
            </div>
          ))}
    </div>
  );
}
