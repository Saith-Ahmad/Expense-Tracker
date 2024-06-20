import express from "express"
import { loginController, registerController } from "../controllers/userController.mjs"

//router object
const router = express.Router();


//post
//login
router.post('/users/login', loginController)
router.post('/users/register', registerController)


export { router }