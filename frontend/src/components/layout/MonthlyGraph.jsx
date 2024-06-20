import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Chart from "chart.js/auto";

const MonthlyGraph = ({ transactionsData }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Initialize state variables
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Filter transactions by the selected months
    const filteredTransactions = transactionsData.filter((transaction) =>
      months.includes(moment(transaction.date).format("MMMM"))
    );

    // Separate income and expense data
    const incomeData = [];
    const expenseData = [];

    // Initialize data arrays for each month
    months.forEach(() => {
      incomeData.push(0);
      expenseData.push(0);
    });

    // Calculate total income and expense for each month
    filteredTransactions.forEach((transaction) => {
      const transactionMonth = moment(transaction.date).format("MMMM");
      const transactionAmount = transaction.amount;

      if (transaction.type === "income") {
        const monthIndex = months.indexOf(transactionMonth);
        incomeData[monthIndex] += transactionAmount;
      } else if (transaction.type === "expense") {
        const monthIndex = months.indexOf(transactionMonth);
        expenseData[monthIndex] += transactionAmount;
      }
    });

    // Calculate net savings for each month
    const savingsData = incomeData.map((income, index) => income - expenseData[index]);


      
    // Create chart data
    const chartData = {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#3B71CA",
          fill: false,
        },
        {
          label: "Expense",
          data: expenseData,
          borderColor: "#DC4C64",
          fill: false,
        },
        {
          label: "Net Savings",
          data: savingsData,
          borderColor: "#4CAF50",
          fill: false,
        },
      ],
    };
    setChartData(chartData);
  }, [transactionsData, months]);

  const options = {
  responsive: true,
  maintainAspectRatio: false,
    scales: {
      x: {
        // ... other options
        ticks: {
          color: 'white',
          fontSize: 12, // Adjust font size for x-axis labels
          // maxTicksLimit: 12,
        },
      },
      y: {
        // ... other options
        ticks: {
          color: 'white',
          fontSize: 12, // Adjust font size for y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          fontSize: 12, // Adjust font size for legend text
        },
      },
      title: {
        // ... other options
        fontSize: 16, // Adjust font size for chart title
      },
    },
    // ... other options
  };
  

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
};

export default MonthlyGraph;
