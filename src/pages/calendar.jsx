import React, { useState } from "react";
import "./calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysOfWeek = [...Array(daysInMonth)].map((_, index) => {
    const dayOfWeekIndex = (firstDayOfMonth + index) % 7;
    return ["S", "M", "T", "W", "Th", "F", "S"][dayOfWeekIndex];
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="prev-month-btn" onClick={handlePrevMonth}>
          &#8249;
        </button>
        <div className="calendar-title">
          {months[date.getMonth()]} {date.getFullYear()}
        </div>
        <button className="next-month-btn" onClick={handleNextMonth}>
          &#8250;
        </button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
  <tr>
    {daysOfWeek.map((day) => (
      <td key={`weekday-${day}`} className="weekday-cell">
        {day}
      </td>
    ))}
  </tr>
  <tr>
    {[...Array(firstDayOfMonth)].map((_, index) => (
      <td key={`empty-${index}`} className="empty-cell"> </td>
    ))}
    {[...Array(daysInMonth)].map((_, index) => (
      <td key={`day-${index}`} className="day-cell">
        {index + 1}
      </td>
    ))}
  </tr>
</tbody>

      </table>
    </div>
  );
};

export default Calendar;
