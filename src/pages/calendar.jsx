import React, { useState } from "react";
import "./calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedCell, setSelectedCell] = useState(null);
  const [cellState, setCellState] = useState({});

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

  const handleCellClick = (day) => {
    setSelectedCell(day);
  };

  const handleYesClick = () => {
    setCellState((prevCellState) => ({
      ...prevCellState,
      [selectedCell]: "yes"
    }));
    setSelectedCell(null);
  };

  const handleNoClick = () => {
    setCellState((prevCellState) => ({
      ...prevCellState,
      [selectedCell]: "no"
    }));
    setSelectedCell(null);
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
                const cellKey = `day-${weekIndex}-${dayIndex}`;

                let cellClass = "day-cell";
                if (!isCurrentMonth) {
                  cellClass += " other-month";
                } else if (selectedCell === day) {
                  cellClass += " selected";
                }

                if (cellState[day] === "yes") {
                  cellClass += " filled yes";
                } else if (cellState[day] === "no") {
                  cellClass += " filled no";
                }

                return (
                  <td
                    key={cellKey}
                    className={cellClass}
                    onClick={() => handleCellClick(day)}
                  >
                    {isCurrentMonth && day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCell !== null && (
        <div className="button-wrapper">
          <h2>Did you do your habit this day?</h2>
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
