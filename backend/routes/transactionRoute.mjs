import express from "express"
import { getAllTransaction, addTransaction, deleteTransaction, updateTransaction } from "../controllers/tranactionalCtrl.mjs";

//router object
const Transactionroute = express.Router();

//post route 
//add transaction
Transactionroute.post("/add-transaction", addTransaction)


Transactionroute.put("/update-transaction", updateTransaction)

//Delete Transaction
Transactionroute.post("/delete-transaction", deleteTransaction)   

//get route
Transactionroute.post("/get-transaction",getAllTransaction)



export { Transactionroute }