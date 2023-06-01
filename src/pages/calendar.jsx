import React, { useState, useEffect, useCallback } from "react";
import "./calendar.css";
import {doc, collection, getDoc, addDoc} from "firebase/firestore";
import {firestore, auth} from "../firebase"

const Calendar = (props) => {
  const {selectedHabit} = props
  const [date, setDate] = useState(new Date());
  const [selectedCell, setSelectedCell] = useState(null);
  const [cellState, setCellState] = useState({});
  const [monthCellState, setMonthCellState] = useState({});
  const fetchResponses = useCallback(async () => {
    if (!selectedHabit) return;

    try {
      const habitDocRef = doc(
        firestore,
        "users",
        auth.currentUser.uid,
        "habits",
        selectedHabit
      );
      const habitDocSnapshot = await getDoc(habitDocRef);

      if (habitDocSnapshot.exists()) {
        const habitData = habitDocSnapshot.data();
        if (habitData.responses) {
          const responses = habitData.responses;
          const updatedCellState = {...cellState};
          Object.keys(responses).forEach((responseDate) => {
            updatedCellState[responseDate] = responses[responseDate].value;
          });
          setCellState(updatedCellState);
          localStorage.setItem(`cellState-${selectedHabit}`, JSON.stringify(updatedCellState));
        }
      }
      
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  }, [selectedHabit, cellState]);


  useEffect(() => {
    const storedCellState = localStorage.getItem(`cellState-${selectedHabit}`);
    if(storedCellState){
      setCellState(JSON.parse(storedCellState));
    }
  }, [selectedHabit])

  useEffect(() => {
    const storedCellState = localStorage.getItem(`cellState-${selectedHabit}`);
    if(storedCellState){
      setCellState(JSON.parse(storedCellState));
    }
    fetchResponses();
  }, [selectedHabit, cellState, fetchResponses]);

 

  
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
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
    setSelectedCell(null);
    setMonthCellState({});
  };
  // UseEFfect to display the selected cell from local storage 
  // and update the cellState to empty
  useEffect(() => {
    const newMonth = `${date.getFullYear()}-${date.getMonth()}`;
    const storedCellState = localStorage.getItem(`cellState-${selectedHabit}`);
    if (storedCellState) {
      setCellState(JSON.parse(storedCellState));
    } else {
      setCellState({});
    }
  }, [selectedHabit, date]);
  



  const handleCellClick = (day) => {
    setSelectedCell(day);
   
  };

  const handleYesClick = async () => {
    if (selectedCell !== null) {
      const updatedCellState = { ...cellState, [selectedCell]: "yes" };
      setCellState(updatedCellState);
  
      if (selectedHabit) {
        try {
          const uniqueHabitDocRef = doc(firestore, "users", auth.currentUser.uid, "habits", selectedHabit);
          const habitResponseRef = collection(uniqueHabitDocRef, "responses");
          const newResponse = {
            date: selectedCell, // Assuming selectedCell is in the format you want to store the date
            value: "yes",
          };
          await addDoc(habitResponseRef, newResponse);
          localStorage.setItem(`cellState-${selectedHabit}`, JSON.stringify(updatedCellState));
          await fetchResponses();
        } catch (error) {
          console.error("Error updating responses:", error);
        }
      }
    }
    setSelectedCell(null);
  };
  const handleNoClick = async () => {
    if (selectedCell !== null) {
      const updatedCellState = { ...cellState, [selectedCell]: "no" };
      setCellState(updatedCellState);
  
      if (selectedHabit) {
        try {
          const uniqueHabitDocRef = doc(firestore, "users", auth.currentUser.uid, "habits", selectedHabit);
          const habitResponseRef = collection(uniqueHabitDocRef, "responses");
          const newResponse = {
            date: selectedCell, // Assuming selectedCell is in the format you want to store the date
            value: "no",
          };
          await addDoc(habitResponseRef, newResponse);
          localStorage.setItem(`cellState-${selectedHabit}`, JSON.stringify(updatedCellState));
          await fetchResponses();
        } catch (error) {
          console.error("Error updating responses:", error);
        }
      }
    }
    setSelectedCell(null);
  };

  // UseEFfect to display the selected cell from local storage
  useEffect(() => {
    setSelectedCell(null);
    setCellState({});
  }, [date]);
  
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
