import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../pages/url";

const Popup = ({ setStateUpdate }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isloadind, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        await axios.post(`${baseURL}/transactions/add-transaction`, {
          amount,
          type,
          category,
          reference,
          date,
          userid: user._id,
        });
      }
      setStateUpdate((prev) => prev + 1);
      toast.success("Transaction Created Successfully");
      closePopup();
      setAmount("");
      setCategory("");
      setDate("");
      setReference("");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add Transaction");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
      whileHover={{ scale:1.1  }}
        onClick={openPopup}
        className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className="w-full md:text-lg relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 ">
        Add Transaction
          
        </span>
      </motion.button>
      {isPopupOpen && (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-100 absolute z-[100]">
          <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-gray-300">
                    Amount
                  </label>
                  <input
                    type="Number"
                    id="amount"
                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-500"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-300">
                    Type
                  </label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-500"
                    placeholder="Select type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-300">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-500 "
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Work">Work</option>
                    <option value="Investements">Investements</option>
                    <option value="Food">Food</option>
                    <option value="Medical">Medical</option>
                    <option value="Fees">Fees</option>
                    <option value="Rent">Rent</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="reference" className="block text-gray-300">
                    Reference
                  </label>
                  <input
                    type="text"
                    id="reference"
                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-500"
                    placeholder="Enter reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-500"
                    placeholder="Select date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                {!isloadind && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow"
                  >
                    Submit
                  </button>
                )}
              </form>

              <button
                onClick={closePopup}
                className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
