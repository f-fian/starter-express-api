
import express from "express"
import {createTour,getSingleTour,updateTour,deleteTour,getAllTour
        ,getTourBySearch,getFeaturedTour,getTourCount} from "../controllers/tourController.js"
import { verifyAdmin } from "../utils/verivyToken.js"

const router = express.Router()

//create new tour

router.get("/:id",getSingleTour)
router.get("/",getAllTour)
router.get("/search/getTourBySearch",getTourBySearch)
router.get("/search/getFeaturedTour",getFeaturedTour)
router.get("/search/getTourCount",getTourCount)

router.post("/",verifyAdmin,createTour)
router.put("/:id",verifyAdmin,updateTour)
router.delete("/:id",verifyAdmin,deleteTour)


export default router

