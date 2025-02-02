import React, { useState } from "react";

const TimePicker = ({ setSelectedTime, selectedTime, setShowTimePicker }) => {
  const [time, setTime] = useState(selectedTime);

  const handleTimeChange = (field, value) => {
    setTime((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <div className="absolute left-0 mt-2 bg-white p-4 shadow-lg rounded-lg z-10">
      <h4 className="text-lg font-medium mb-2">Pick a Time</h4>
      <div className="flex justify-between items-center gap-2 mb-4">
        <select
          value={time.hours}
          onChange={(e) => handleTimeChange("hours", parseInt(e.target.value))}
          className="px-3 py-2 border rounded-md"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          value={time.minutes}
          onChange={(e) =>
            handleTimeChange("minutes", parseInt(e.target.value))
          }
          className="px-3 py-2 border rounded-md"
        >
          {[0, 15, 30, 45].map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={time.period}
          onChange={(e) => handleTimeChange("period", e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowTimePicker(false)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TimePicker;
