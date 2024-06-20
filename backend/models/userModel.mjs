import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true, 'name is required']
    },
    email : {
        type: String,
        required : [true, 'email is required and should be Unique'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Password is Required']
    }
},{
    timestamps : true
})



const userModel = mongoose.model('users', userSchema)
export { userModel }