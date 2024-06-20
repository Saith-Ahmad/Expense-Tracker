import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MonthlyGraph from "./MonthlyGraph";
ChartJS.register(ArcElement, Tooltip, Legend);

const GraphView = ({ transactionsData }) => {
  console.log(transactionsData);
  const totalTransactions = transactionsData.length;
  const totalTurnover = transactionsData.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const expense = transactionsData.filter(
    (data) => data.type === "expense"
  ).length;
  const income = transactionsData.filter(
    (data) => data.type === "income"
  ).length;

  const totalIncomeTurnover = transactionsData
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = transactionsData
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const incomePercent = ((totalIncomeTurnover / totalTurnover) * 100).toFixed(
    1
  );
  const expensePercent = ((totalExpenseTurnover / totalTurnover) * 100).toFixed(
    1
  );
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#3B71CA", "#DC4C64"],
        hoverOffset: 4,
        borderRadius: 5,
        spacing: 5,
        borderWidth: 0.7,
      },
    ],
  };
  const config = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncomeTurnover, totalExpenseTurnover],
        backgroundColor: ["#3B71CA", "#DC4C64"],
        hoverOffset: 4,
        borderRadius: 5,
        spacing: 5,
        borderWidth: 0.7,
      },
    ],
  };

  const options = {
    cutout: 105, // Adjust this value to make the walls thinner or thicker
  };

  const Totalsavings = () => {
    const totalRemainings = totalIncomeTurnover - totalExpenseTurnover;
    return Math.abs(totalRemainings);
  };

  const checkSavings = () => {
    if (totalIncomeTurnover - totalExpenseTurnover < 0) {
      return "Bankruptcy";
    } else {
      return "Savings";
    }
  };
  return (
    <>
      <div className="container mx-auto flex flex-col items-center md:flex-row justify-center gap-10 flex-wrap w-full m-5 px-4">
        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg shadow-lg w-[300px] md:w-[48%] ">
          <div className="relative">
            <Doughnut data={data} options={options} />
            <div className="text-4xl text-indigo-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {totalTransactions}
            </div>
            <p className="text-sm text-indigo-300 absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3">
              Total Transactions
            </p>
          </div>
          <h4 className="text-red-400">Expense Transactions = {expense}</h4>
          <h4 className="text-blue-400">Income Transactions = {income}</h4>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg shadow-lg  w-[300px] md:w-[48%] ">
          <div className="relative">
            <Doughnut data={config} options={options} />
            <div className="text-4xl font-bold text-indigo-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {Totalsavings()}
            </div>
            <p className="text-sm text-indigo-300 absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3">
              {checkSavings()}
            </p>
            <p className="text-sm text-indigo-300 absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-3">
              PKR
            </p>
          </div>
          <h4 className="text-red-400">Expense = {expensePercent}%</h4>
          <h4 className="text-blue-400">Income ={incomePercent} %</h4>
        </div>
      </div>

      <div className="container mx-auto flex justify-center flex-row items-start m-10">
      <div className="md:w-[70%] w-[100%]">
        <MonthlyGraph transactionsData={transactionsData} />
      </div>
      </div>
    </>
  );
};

export default GraphView;
