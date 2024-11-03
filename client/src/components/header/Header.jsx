import React from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full bg-violet-900 mb-20 absolute left-0 right-0 top-0">
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
        <button className="px-4 py-2 bg-violet-700 text-neutral-200 hover:shadow-md ">
          Sign in / Register
        </button>
        <div className="py-2 absolute px-20 -bottom-10 right-0 left-0 ">
          <input
            type="text"
            className="w-full px-16 py-6 rounded-md border-1 focus:outline-violet-700 relative bg-neutral-200 border-2 border-gray-500"
            placeholder="Where are you going?"
          />
          <button className="px-4 py-4 bg-violet-700 text-neutral-200 hover:shadow-md absolute top-4 right-32 rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
