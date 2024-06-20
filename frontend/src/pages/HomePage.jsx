import React, { useEffect, useState } from "react";
import { SiGoogleanalytics } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { motion } from 'framer-motion';
import Layout from "../components/layout/Layout";
import Popup from "../components/layout/Popup";
import TableView from "../components/layout/TableView";
import GraphView from "../components/layout/GraphView";
import { baseURL } from "./url";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";

import axios from "axios";
import { TimeFilter } from "../components/layout/TimeFilter";
import { TypeFilter } from "../components/layout/TypeFilter";

export const HomePage = () => {
  const [view, setView] = useState("list");
  const [transactionsData, setTransactionsData] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(1);
  const [frequency, setFrequency] = useState("30");
  const [type, setType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        const response = await axios.post(
          `${baseURL}/transactions/get-transaction`,
          {
            userid: user._id,
            frequency,
            startDate,
            endDate,
            type,
          }
        );
        if (response.data.transactions.length >= 0) {
          setTransactionsData(response.data.transactions);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [frequency, startDate, endDate, type, stateUpdate]);
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="max-w-[250px] md:max-w-[500px] container px-5 py-3 mx-auto relative">
          <Popup setStateUpdate={setStateUpdate} />
        </div>
        <div className="flex flex-row container mx-auto justify-center">
          <TimeFilter
            frequency={frequency}
            setFrequency={setFrequency}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />

          <TypeFilter type={type} setType={setType} />
        </div>
      </div>
      <ul className="flex flex-row gap-4 cursor-pointer container mx-auto justify-center p-2 items-center my-3">
        <motion.li
        whileHover={{ scale: 1.1 }}
          className={`bg-gray-900 p-2 px-4 rounded-md w-[140px] flex flex-col justify-center items-center gap-2 ${
            view === "list" && "glow-Shadow"
          }`}
          onClick={() => setView("list")}
        >
          List <FaClipboardList size={"20px"} />
        </motion.li>

        <motion.li
        whileHover={{ scale: 1.1 }}
          className={`bg-gray-900 p-2 px-4 rounded-md w-[140px] flex flex-col justify-center items-center gap-2 ${
            view === "graph" && "glow-Shadow"
          }`}
          onClick={() => setView("graph")}
        >
          Analytics <SiGoogleanalytics size={"20px"} />
        </motion.li>
      </ul>
      {view === "list" && (
        <TableView
          transactionsData={transactionsData}
          isLoading={isLoading}
          setStateUpdate={setStateUpdate}
        />
      )}
      {view == "graph" && (
        <GraphView transactionsData={transactionsData} isLoading={isLoading} />
      )}
    </Layout>
  );
};
