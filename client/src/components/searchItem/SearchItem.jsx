import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="w-full h-[300px] flex gap-x-4 border-2 shadow-md p-2 cursor-pointer">
      <img src={item.photos[0]} alt="" className="w-full h-full object-cover" />
      <div className="flex flex-col h-full justify-between">
        <h1 className="font-semibold text-2xl">{item.name}</h1>
        <span className="font-normal font-sm">
          {item.distance}m from center
        </span>
        <span className="font-normal font-sm">Free airport taxi</span>
        <span className="font-normal font-sm">
          Studio Apartment with Air conditioning
        </span>
        <span className="font-normal font-sm">{item.desc}</span>
        <span className="font-normal font-sm">Free cancellation </span>
        <span className="font-normal font-sm">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="flex flex-col justify-between gap-y-4">
        {item.rating && (
          <div className="flex gap-x-2">
            <span className="p-1 rounded-sm bg-violet-500 text-neutral-200">
              Excellent
            </span>
            <button className="">{item.rating}</button>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-2xl">${item.cheapestPrice}</span>
          <span className="font-normal text-sm">Includes taxes and fees</span>
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
