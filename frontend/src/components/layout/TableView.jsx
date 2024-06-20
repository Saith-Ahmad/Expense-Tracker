import React, { useState } from "react";
import { Blocks } from "react-loader-spinner";
import { motion } from "framer-motion";
import "./style.css";
import { baseURL } from "../../pages/url";

import axios from "axios";
import moment from "moment";
import { MdDeleteSweep } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal"; // Import your ConfirmationModal component here
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";

const TableView = ({ transactionsData, isLoading, setStateUpdate }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const deleteTransaction = async (id) => {
    try {
      setShowConfirmation(false);
      await axios.post(`${baseURL}/transactions/delete-transaction`, {
        id,
      });
      toast.info("Transaction Deleted Successfully");
      setStateUpdate((prev) => prev - 1);
    } catch (error) {
      toast.error("Failed to Delete Transaction");
    }
  };

  const handleDeleteClick = (_id) => {
    // Show the confirmation modal and set the transaction to delete
    setShowConfirmation(true);
    setTransactionToDelete(_id);
  };

  const handleCloseConfirmation = () => {
    // Close the confirmation modal
    setShowConfirmation(false);
    setTransactionToDelete(null);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
          <Blocks
            height="120"
            width="120"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
      )}
      <>
        <div className="parent flex flex-col gap-4 container mx-auto my-20 relative">
          <div className="flex flex-row flex-wrap bg-gray-900 rounded-md min-h-[50px] justify-around items-center mx-3 p-2 gap-3 row_class">
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Amount
            </div>
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Type
            </div>
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Category
            </div>
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Date
            </div>
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Delete
            </div>
            <div className="min-w-[70px] md:text-xl text-lg font-light rounded-md p-1 text-center">
              Update
            </div>
          </div>

          {transactionsData.length < 1 && (
            <div className="flex flex-row flex-wrap bg-gray-900 rounded-md min-h-[50px] justify-around items-center mx-3 p-2 gap-3 row_class text-2xl">
              No Data Found
            </div>
          )}
          {transactionsData.map((transaction, index) => (
            <motion.div
            whileHover={{ boxShadow : "0px 0px 15px rgba(0, 255, 255, 0.573)" }}

              className="flex flex-row flex-wrap bg-gray-900 rounded-md min-h-[50px] justify-around items-center mx-3 p-2 gap-3 row_class"
              key={index}
            >
              <div className="min-w-[70px] md:text-xl text-sm font-bolder bg-cyan-950 rounded-md p-1 text-center">
                {transaction?.amount}
              </div>
              <div className="min-w-[70px] md:text-xl text-sm font-bolder bg-cyan-950 rounded-md p-1 text-center">
                {transaction?.type}
              </div>
              <div className="min-w-[70px] md:text-xl text-sm font-bolder bg-cyan-950 rounded-md p-1 text-center">
                {transaction?.category}
              </div>
              <div className="min-w-[70px] md:text-xl text-sm font-bolder bg-cyan-950 rounded-md p-1 text-center">
                {" "}
                {moment(transaction?.date).format("YYYY-MM-DD")}
              </div>
              <motion.div className=" md:text-xl text-lg font-bolde bg-red-700 rounded-md p-1 text-center"
              whileHover={{ scale: 1.3 }}
              >
                <MdDeleteSweep
                  onClick={() => handleDeleteClick(transaction._id)}
                />
              </motion.div>

              <div className=" md:text-xl text-lg font-bolder bg-blue-700 rounded-md p-1 text-center "
              >
                <Update
                  setStateUpdate={setStateUpdate}
                  transaction={transaction}
                />
              </div>
              
            </motion.div>
          ))}
        </div>
      </>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          onCancel={handleCloseConfirmation}
          onConfirm={() => deleteTransaction(transactionToDelete)}
        />
      )}
    </div>
  );
};

export default TableView;
