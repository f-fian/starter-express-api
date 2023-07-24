import Review from "../models/Review.js"
import Tour from "../models/Tour.js"


export const createReview = async(req,res)=>{
    try {
        const tourId = req.params.id
        const newReview = new Review(req.body)
        const savedReview = await newReview.save()

        await Tour.findByIdAndUpdate(tourId,{
            $push:{reviews:savedReview._id}
        })
        res.status(201).json({success:true,message:"new Review is created",data:savedReview})
    } catch (error) {
        res.status(500).json({success:false,message:"failed to create new Review"})
    }
}
export const getAllreviews = async(req,res)=>{
    try {
        const allReviews = await Review.find()
        res.status(201).json({success:true,message:"Fetch all reviews",data:allReviews})
    } catch (error) {
        res.status(500).json({success:false,message:"failed to fetch all review"})
    }
}
export const deleteReview = async(req,res)=>{
    try {
        const id = req.params.id
        await Review.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Success delete review"})
    } catch (error) {
        res.status(500).json({success:false,message:"failed to delete review"})
    }
}