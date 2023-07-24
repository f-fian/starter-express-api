import express from "express"
import {getSingleUser,updateUser,deleteUser,getAllUser} from "../controllers/userController.js"
import { verifyUser,verifyAdmin } from "../utils/verivyToken.js"

const router = express.Router()

//create new tour
router.get("/:id",verifyUser,getSingleUser)
router.put("/:id",verifyUser,updateUser)
router.delete("/:id",verifyUser,deleteUser)

router.get("/",getAllUser)

export default router