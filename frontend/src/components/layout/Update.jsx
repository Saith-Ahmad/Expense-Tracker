import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { baseURL } from "../../pages/url";

const Update = ({ setStateUpdate, transaction }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isloadind, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transaction) {
      const { amount, category, type, reference, date } = transaction;
      setAmount(amount || "");
      setCategory(category || "");
      setType(type || "");
      setReference(reference || "");
      setDate(moment(date).format("YYYY-MM-DD") || "");
    }
  }, [transaction]);

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
        await axios.put(`${baseURL}/transactions/update-transaction`, {
          id: transaction._id,
          amount,
          type,
          category,
          reference,
          date,
        });
      }
      setStateUpdate((prev) => prev + 1);
      toast.success("Transaction Updated Successfully");
      closePopup();
      setAmount("");
      setCategory("");
      setDate("");
      setReference("");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update Transaction");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FaEdit onClick={openPopup} />
      {isPopupOpen && (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-100 absolute z-[102] ">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Transaction</h2>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white" // Set the fill color to white
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    width="18px"
                    height="18px"
                  >
                    {/* Your SVG icon code goes here */}
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 16l-6-6h12z" />
                  </svg>
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

export default Update;
