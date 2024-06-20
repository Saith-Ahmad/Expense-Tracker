import mongoose from "mongoose";

const transActionSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : [true , "amount is required"]
    },
    category : {
        type : String,
        required : [true , "category is required"]
    },
    type : {
        type : String,
        required : [true , "category is required"]
    },
    reference : {
        type : String
    },
    date : {
        type : Date,
        required : [true, "date is required"]
    }
},{
    timestamps : true
})



const transactionModel = mongoose.model("transactions", transActionSchema)


export { transactionModel }