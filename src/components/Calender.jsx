import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, 1));
    setSelectedYear(selectedDate.getFullYear());
    setSelectedMonth(selectedDate.getMonth());
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedYear, selectedMonth + 1, 1));
    setSelectedYear(selectedDate.getFullYear());
    setSelectedMonth(selectedDate.getMonth());
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedDate(new Date(selectedYear, selectedMonth, 1));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    setSelectedDate(new Date(selectedYear, selectedMonth, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          const isCurrentDate =
            day === new Date().getDate() &&
            selectedMonth === new Date().getMonth() &&
            selectedYear === new Date().getFullYear();

          week.push(
            <td
              key={j}
              className={`${
                isCurrentDate ? 'bg-blue-500 text-white' : ''
              } p-2 border border-gray-300 text-center ${
                isCurrentDate ? 'rounded-full' : ''
              }`}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <div className="calendar-header mb-2 flex justify-between items-center">
        <button className="text-lg" onClick={handlePrevMonth}>
          &lt;
        </button>
        <select
          className="text-lg"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
        <select
          className="text-lg"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={selectedYear - i}>
              {selectedYear - i}
            </option>
          ))}
        </select>
        <button className="text-lg" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <table className="calendar-table w-full border-collapse">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="p-2 border border-gray-300 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
