import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import Navbar from "../components/navbar/Navbar";
import Reserve from "../components/reserve/Reserve";

export default function Hotel() {
  const location = useLocation();
  const paramsId = useParams().id;
  console.log("location:", location);
  console.log("Params:", paramsId);
  const [data, setData] = useState(null);
  const { dates, options } = useContext(SearchContext);
  const [open, setOpen] = useState(false);

  async function fetchData() {
    const { data } = await axios.get(`/api/hotels/find/${paramsId}`);
    console.log(data.hotel);
    setData(data.hotel);
  }

  console.log("DATES: ", dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log("DAYS: ", days);

  function handleOnClick() {
    console.log("RESERVE NOW");
    setOpen(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <h1 className="">Loading, please wait...</h1>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full h-full flex justify-between gap-x-8 mt-[200px] py-10">
        <div className="flex-1 flex flex-col gap-y-1">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <div className="flex gap-x-2">
            <span>{data.address}</span>
          </div>
          <span className="text-violet-700 font-normal">
            Excellent location - {data.distance}m from center
          </span>
          <span className="text-green-700 font-normal">
            Book a stay over ${data.cheapestPrice} at this property and get a
            free airport taxi
          </span>

          <h1 className="text-3xl font-semibold mt-8">{data.desc}</h1>
        </div>

        <div className="w-full max-w-[350px] flex flex-col gap-y-2">
          <button className="self-end w-42 px-2 bg-violet-700 text-neutral-200 text-center p-2 rounded-md font-semibold mb-20">
            Reserve or Book Now!
          </button>

          <div className="w-full flex flex-col gap-y-8 p-6 bg-violet-200 rounded-lg">
            <h3 className="text-xl font-semibold">
              Perfect for a 9-night stay!
            </h3>
            <p className="">
              Located in the real heart of {data.city} this property has an
              excellent location score of {data.rating}
            </p>

            <div className="flex items-center gap-x-4">
              <span className="text-3xl font-bold">
                ${days * data.cheapestPrice * options.room}
              </span>
              <span className="text-3xl font-normal">({days} nights)</span>
            </div>
            <button
              className="bg-violet-700 text-neutral-200 font-semibold text-center p-2 rounded-md"
              onClick={handleOnClick}
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
      {open ? <Reserve hotel={data} setOpen={setOpen} /> : null}
    </div>
  );
}
