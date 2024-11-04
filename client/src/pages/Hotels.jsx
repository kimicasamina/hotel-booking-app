import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/searchItem/SearchItem";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";

export default function Hotels() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [data, setData] = useState([]);

  //   const { data, loading, error, reFetch } = useFetch(
  //     `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  //   );

  const handleSearch = () => {
    fetchData();
  };

  async function fetchData() {
    const { data } = await axios.get(
      `/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    );
    setData(data.hotels);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("location:", location);
  console.log("data:", data);
  return (
    <div className="w-full h-full flex ">
      <div className="bg-violet-500 absolute left-0 right-0 top-0 h-10 "></div>
      <div className="h-[550px] max-w-[350px] bg-yellow-400 flex flex-col gap-y-4 p-4 mt-14 rounded-md">
        <h2 className="text-xl font-semibold">Search</h2>
        <div className="flex flex-col gap-y-2">
          <label className="">Destination</label>
          <input
            type="text"
            className="text-neutral-700 p-2"
            placeholder="Enter your destination"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-y-4 relative">
          <label>Check-in Date</label>
          <span
            className="w-full p-2 bg-neutral-100 text-neutral-700"
            onClick={() => setOpenDate(!openDate)}
          >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
            dates[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}
              className="absolute top-20"
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-y-4 relative">
          <label className="">Options</label>
          <div className="w-full flex justify-between gap-x-2 ">
            <label className="">Min price per nights</label>
            <input
              type="number"
              className="w-14"
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between gap-x-2 ">
            <label className="">Max price per nights</label>
            <input
              type="number"
              className="w-14"
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between gap-x-2 ">
            <label className="">Adult</label>
            <input
              type="number"
              className="w-14"
              min={1}
              placeholder={options.adult}
            />
          </div>
          <div className="w-full flex justify-between gap-x-2 ">
            <label className="">Children</label>
            <input
              type="number"
              className="w-14"
              min={0}
              placeholder={options.children}
            />
          </div>
          <div className="w-full flex justify-between gap-x-2 ">
            <label className="">Room</label>
            <input
              type="number"
              min={1}
              placeholder={options.room}
              className="w-14"
            />
          </div>
        </div>

        <button
          className="bg-violet-500 py-4 text-neutral-200 rounded-md"
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </div>
      {!data && data.length === 0 ? (
        <div>Loading, please wait...</div>
      ) : (
        <div className="flex-1 flex flex-col gap-y-10 mt-14 px-4 min-h-[600px] overflow-y-scroll no-scrollbar">
          {data.map((item) => (
            <SearchItem item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
}
