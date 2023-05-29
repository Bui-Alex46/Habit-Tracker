import React, { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
          {[...Array(Math.ceil((daysInMonth + firstDayOfMonth) / 7))].map((_, weekIndex) => (
            <tr key={`week-${weekIndex}`}>
              {[...Array(7)].map((_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
                const isCurrentMonth = day >= 1 && day <= daysInMonth;
                return (
                  <td
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`day-cell ${isCurrentMonth ? 'current-month' : 'other-month'}`}
                  >
                    {isCurrentMonth && day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
