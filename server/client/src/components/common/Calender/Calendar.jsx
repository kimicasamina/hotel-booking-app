import React from "react";
import { DateRangePicker } from "react-date-range";

export default function Calendar() {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  function handleSelect(e, ranges) {
    console.log(ranges);
  }

  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={(e) => handleSelect(e, ranges)}
    />
  );
}

{
  /* <div className="headerSearchItem">
  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
  <span
    onClick={() => setOpenDate(!openDate)}
    className="headerSearchText"
  >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
    dates[0].endDate,
    "MM/dd/yyyy"
  )}`}</span>
  {openDate && (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => setDates([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dates}
      className="date"
      minDate={new Date()}
    />
  )}
</div>; */
}
