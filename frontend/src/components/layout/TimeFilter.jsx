import React from "react";
import DatePicker from "react-datepicker";
import "../../pages/datePicker.css";
import { motion } from "framer-motion";

export const TimeFilter = ({
  frequency,
  setFrequency,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
}) => {
  return (
    <div style={{ zIndex: 50 }}>
      {" "}
      {/* Set a higher z-index for the parent container */}
      <div className="m-2 p-1 relative">
        <label htmlFor="time" className="block text-gray-100 ms-2">
          Filter Time
        </label>
        <motion.select
        whileHover={{ scale: 1.05 }}
          id="type"
          value={frequency}
          className="px-4 w-50 py-2 border border-gray-600 rounded bg-gray-900 outline-1 outline-cyan-500 outline-double"
          placeholder="Select type"
          onChange={(e) => setFrequency(e.target.value)}
          required
        >
          <option value="7">Week</option>
          <option value="30">Month</option>
          <option value="360">Year</option>
          <option value="custom">Custom</option>
        </motion.select>
        {frequency === "custom" && (
          <>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              className="px-4 py-2 border border-cyan-600 rounded bg-gray-800 z-[100] absolute top-[33px] left-[15px] w-[150px]"
              popperPlacement="top-start"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "0, 10", // Adjust the offset as needed
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                },
              }}
            />
            <div></div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="px-4 py-2 border border-cyan-600 rounded bg-gray-800 z-[100] absolute right-[-120px] w-[150px]"
              popperPlacement="top-start"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "0, 10", // Adjust the offset as needed
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
