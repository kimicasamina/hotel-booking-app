import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="w-full min-h-[350px] flex gap-x-4 border-2 shadow-lg p-4 cursor-pointer rounded-md">
      <img src={item.photos[0]} alt="hotel images" className="w-full h-full" />
      <div className="flex flex-col h-full justify-between">
        <h1 className="font-semibold text-2xl">{item.name}</h1>
        <span className="font-normal font-sm">
          {item.distance}m from center
        </span>
        <span className="font-normal font-sm bg-green-700 py-2 rounded-md text-neutral-200 text-center">
          Free airport taxi
        </span>
        <span className="font-bold font-sm">
          Studio Apartment with Air conditioning
        </span>
        <span className="font-normal font-sm">{item.desc}</span>
        <span className="font-bold text-green-700 font-sm">
          Free cancellation{" "}
        </span>
        <span className="font-normal text-green-700 font-sm">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="flex flex-col justify-between gap-y-4">
        {item.rating && (
          <div className="flex justify-between items-center gap-x-2">
            <span className="font-semibold">Excellent</span>
            <button className="p-1 rounded-sm bg-violet-500 text-neutral-200">
              {item.rating}
            </button>
          </div>
        )}
        <div className="flex flex-col justify-between">
          <span className="font-semibold text-2xl text-right">
            ${item.cheapestPrice}
          </span>
          <span className="font-normal text-sm text-right">
            Includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className="bg-violet-500 rounded-sm w-full text-center font-sm text-neutral-200 py-1">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
