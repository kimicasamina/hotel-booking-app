import React from "react";
import { FaBed } from "react-icons/fa6";
import { AiFillCar } from "react-icons/ai";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const navlinks = [
  {
    id: 1,
    name: "Stays",
    icon: <FaBed />,
  },
  {
    id: 2,
    name: "Flights",
    icon: <LiaPlaneDepartureSolid />,
  },
  {
    id: 3,
    name: "Car Rentals",
    icon: <AiFillCar />,
  },
  {
    id: 4,
    name: "Attractions",
    icon: <FaBed />,
  },
  {
    id: 5,
    name: "Airport taxis",
    icon: <AiFillCar />,
  },
];

export default function Navbar() {
  return (
    <div className="w-full flex items-center gap-x-8">
      {navlinks &&
        navlinks.map((item, i) => (
          <Link
            className="flex items-center gap-x-2 p-2 rounded-3xl border border-transparent hover:border-neutral-200 shadow-none"
            key={i}
          >
            <span className="text-neutral-200 ">{item.icon}</span>
            <span className="text-neutral-200 ">{item.name}</span>
          </Link>
        ))}
    </div>
  );
}
