"use client";

import React, { useState } from "react";

export default function CalendarBank() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [...prevMonthDays, ...monthDays];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="w-full max-w-md bg-white text-black rounded-3xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 rounded-lg hover:bg-gray-200 transition"
        >
          &lt;
        </button>
        <h2 className="font-semibold text-lg">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 rounded-lg hover:bg-gray-200 transition"
        >
          &gt;
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center gap-2">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`h-10 flex items-center justify-center rounded-lg ${
              day
                ? "hover:bg-purple-100 cursor-pointer transition"
                : "bg-gray-100"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
