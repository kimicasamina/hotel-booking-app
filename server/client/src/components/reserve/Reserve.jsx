import React, { useEffect, useState } from "react";
import { FaRegRectangleXmark } from "react-icons/fa6";
import axios from "axios";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

export default function Reserve({ hotel, setOpen }) {
  const [rooms, setRooms] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  async function fetchData(url) {
    const { data } = await axios.get(url);
    console.log("HOTEL: ", hotel);
    setRooms(data.list);
  }

  function handleSelect(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  }

  console.log(selectedRooms);
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  useEffect(() => {
    fetchData(`/api/hotels/room/${hotel._id}`);
  }, []);

  console.log("ROOMS: ", rooms);

  return (
    <div className="w-full h-full inset-0 left-0 right-0 top-0 bottom-0 backdrop-blur-md bg-white/30 p-10 absolute ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col gap-y-4 rounded-md bg-neutral-800 text-neutral-200">
        <FaRegRectangleXmark className="mb-2" onClick={(e) => setOpen(false)} />
        <span className="font-semibold">Select your rooms:</span>

        {rooms && rooms.length > 0
          ? rooms.map((room, i) => (
              <div
                className="text-sm border p-2 w-full flex flex-col gap-y-2"
                key={i}
              >
                <div className="w-full flex flex-col gap-y-4">
                  <span className="">{room.title}</span>
                  <span className="">{room.desc}</span>
                  <span className="">Max People: {room.maxPeople}</span>
                  <span className="">Price: {room.price}</span>
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  {room.roomNumbers.length > 0
                    ? room.roomNumbers.map((roomNumber, i) => (
                        <div className="w-full flex flex-col gap-y-2" key={i}>
                          <label>{roomNumber.number}</label>
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
}
