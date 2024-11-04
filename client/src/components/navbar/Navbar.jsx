import React from "react";
import { FaBed } from "react-icons/fa6";
import { AiFillCar } from "react-icons/ai";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { FaRegUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

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

// console.log("USER:", user);
export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  console.log(user);
  async function handleLogout(e) {
    console.log("HELLO, LOGGING OUT.");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="bg-violet-900 absolute left-0 right-0 top-0">
      <div className="flex flex-col gap-y-8 w-full max-w-[1280px] mx-auto py-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl text-neutral-200 font-semibold items-center"
          >
            Hotel Booking App
          </Link>
          {user ? (
            <div className="flex gap-x-4 items-center">
              <div className="flex gap-x-2 items-center">
                <FaRegUser className="w-6 h-6 text-neutral-200" />
                <span className="text-neutral-200 text-2xl">
                  {user.username}
                </span>
              </div>
              <button
                className="flex items-center gap-x-2 text-neutral-200 bg-violet-500 p-2 rounded-md hover:shadow-md"
                onClick={(e) => handleLogout(e)}
              >
                <FaSignOutAlt className="w-6 h-6" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end py-4">
              <Link to="/register">
                <button className="bg-neutral-200 text-violet-900 p-2 px-4 rounded-sm mx-2 text-sm font-semibold hover:shadow-md">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-neutral-200 text-violet-900 p-2 px-4 rounded-sm mx-2 text-sm font-semibold hover:shadow-md">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
        <nav className="flex gap-x-4">
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
        </nav>
      </div>
    </div>
  );
}
