import React, { useEffect, useState } from "react";
import axios from "axios";
export default function FeaturedProperties() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData(url) {
      const { data } = await axios.get(url);
      setData(data.hotels);
    }

    fetchData("/api/hotels?featured=true&limit=4");
  }, []);

  console.log("FEATURED PROPERTIES: ", data);

  return (
    <div className="w-full h-[350px] flex gap-x-8 py-8">
      {!data ? (
        "Loading, Please wait..."
      ) : (
        <>
          {data &&
            data.map((hotel, i) => (
              <div
                className="w-full h-full relative cursor-pointer rounded-xl group"
                key={i}
              >
                <img
                  src={hotel.photos[0]}
                  alt=""
                  className="min-w-full h-full object-cover rounded-xl "
                />
                <div className="absolute inset-0 bg-neutral-700/45 group-hover:bg-neutral-700/55 rounded-xl"></div>
                <div className="flex flex-col gap-y-1 py-2">
                  <h1 className="text-neutral-800 text-xl font-bold">
                    {hotel.name}
                  </h1>
                  <p className="text-neutral-800 text-md font-normal">
                    {hotel.city}
                  </p>
                  <h1 className="text-neutral-800 text-xl font-bold mt-2">
                    Starting from {hotel.cheapestPrice}
                  </h1>
                  {hotel.rating && (
                    <div className="flex gap-x-2">
                      <button className="bg-violet-500 p-1">
                        {hotel.rating}
                      </button>
                      <span className="font-semibold font-sm">Excellent</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
