import { userModel } from "../models/userModel.mjs"
import bcrypt from "bcrypt"


const loginController = async(req, res)=>{
    try {
        const { email, password }  = req.body;
        const user =await userModel.findOne({email})
        const isPasswordTrue = bcrypt.compareSync(password, user.password)
        if(!user){
            res.status(404).send("User not Found")
        }else{
            if(isPasswordTrue){
                res.status(200).json({success:true,user})
            }else{
                res.status(402).send("Incorrect Password")
            }
        }
    } catch (error) {
        res.status(400).
        json({
            success : false,
            error
        })
    }
}

const registerController = async(req, res)=>{
    try {
       const { name, email, password } = req.body
       const hashedPassword = bcrypt.hashSync(password,10)
       const newUser = new userModel({
        name, email, password:hashedPassword
       })
       await newUser.save();
       res.status(201).json({success : true, user:newUser})
    } catch (error) {
        res.status(400).
        json({
            success : false,
            error
        })
    }
}



export { loginController, registerController }