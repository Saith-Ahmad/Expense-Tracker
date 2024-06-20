import { transactionModel } from "../models/TransactionModel.mjs";
import moment from "moment";

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateTransaction = async (req, res) => {
  const { amount, category, reference, date, type } = req.body;
  try {
    const updatedTransaction = await transactionModel.findOneAndUpdate({_id : req.body.id}, {
      amount,
      category,
      reference,
      date,
      type
    });
    res.status(201).json({updatedTransaction});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const deleteTransaction = async(req, res) => {
  try {
    await transactionModel.deleteOne({_id : req.body.id})
    res.status(202).send("Transaction Deleted")
  } catch (error) {
    res.status(500).send("unable to Delete transaction")
  }
}



const getAllTransaction = async (req, res) => {
    try {
      const { frequency, startDate, endDate, type } = req.body;
      let dateQuery;
  
      if (frequency !== 'custom') {
        dateQuery = {
          $gt: moment().subtract(Number(frequency), 'd').toDate(),
        };
      } else {
        const parsedStartDate = moment(startDate).toDate();
            const parsedEndDate = moment(endDate).toDate();

            dateQuery = {
                $gte: parsedStartDate,
                $lte: parsedEndDate,
            };
      }
  
      const query = {
        date: dateQuery,
        userid: req.body.userid,
      };
  
      if (type !== "all") {
        query.type = type;
      } // No type filter for "all"
  
      const transactions = await transactionModel.find(query);
      res.status(200).json({ transactions});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
  

export { addTransaction, getAllTransaction, deleteTransaction,updateTransaction };
