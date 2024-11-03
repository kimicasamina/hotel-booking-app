import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // th
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { FaCalendarDay } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [destination, setDestination] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  function handleSearch() {
    console.log(dates);
    console.log(destination);
    console.log(options);
    navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <>
      {location.pathname == "/" && (
        <div className="w-full bg-violet-900 mb-20 absolute left-0 right-0 top-0 ">
          <div className="w-full max-w-[1280px] px-20 mx-auto py-8 pb-24 relative">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="text-xl text-neutral-200 font-semibold items-center"
              >
                Hotel Booking App
              </Link>
              <div className="flex items-center justify-end py-4">
                <button className="bg-neutral-200 text-violet-900 p-2 px-4 rounded-sm mx-2 text-sm font-semibold hover:shadow-md">
                  Register
                </button>
                <button className="bg-neutral-200 text-violet-900 p-2 px-4 rounded-sm mx-2 text-sm font-semibold hover:shadow-md">
                  Login
                </button>
              </div>
            </div>
            <Navbar />
            <div className="py-8">
              <h1 className="text-neutral-200 text-3xl font-semibold mb-4">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="text-neutral-200 text-sm">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free Hotel Booking App account.
              </p>
            </div>
            <button className="px-4 py-2 bg-violet-700 text-neutral-200 hover:shadow-md">
              Sign in / Register
            </button>

            {/* SEARCH INPUT  */}
            <div className="absolute -bottom-10 bg-neutral-100 rounded-md px-4 py-2 grid grid-cols-4 left-0 mx-20 w-auto right-0 text-neutral-400">
              {/* Destination  */}
              <div className="w-full flex gap-x-2 p-2 items-center">
                <LiaPlaneDepartureSolid className="w-10 h-10 object-cover" />
                <input
                  type="text"
                  className="w-full py-2 px-2 rounded-md bg-transparent"
                  placeholder="Where are you going?"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-x-2 p-2 items-center ">
                <FaCalendarDay className="w-8 h-8 object-cover" />
                <span
                  onClick={() => setOpenDatePicker(!openDatePicker)}
                  className="text-sm"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDatePicker && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className=" z-50 absolute top-20"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="w-full flex items-center gap-x-2 p-2 relative">
                <FaCalendarDay className="w-8 h-8 object-cover" />
                <span
                  className="text-sm"
                  onClick={(e) => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="w-full z-50 absolute top-20 rounded-md border-2 border-neutral-900 bg-neutral-100 p-4">
                    <div className="flex flex-col gap-y-2">
                      <span className="font-semibold">Adult</span>
                      <div className="flex gap-x-2 items-center">
                        <button
                          disabled={options.adult <= 1}
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <span className="font-semibold">Children</span>
                      <div className="flex gap-x-2 items-center">
                        <button
                          disabled={options.children <= 0}
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="font-semibold">
                          {options.children}
                        </span>
                        <button
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <span className="font-semibold">Room</span>
                      <div className="flex gap-x-2 items-center">
                        <button
                          disabled={options.room <= 1}
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="bg-violet-500 rounded-sm p-2"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="w-full px-4 py-4 bg-violet-700 text-neutral-200 hover:shadow-md  top-4 right-32 rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
