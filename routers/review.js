import express from "express"
import { createReview,getAllreviews,deleteReview } from "../controllers/reviewController.js"
import { verifyUser,verifyAdmin } from "../utils/verivyToken.js"

const router = express.Router()

router.post("/:id",verifyUser,createReview)
router.get("/",getAllreviews)
router.delete("/:id",verifyAdmin,deleteReview)

export default router