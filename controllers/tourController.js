import Tour from "../models/Tour.js"

//Add tour 
export const createTour = async(req,res)=>{
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save()
        res.status(201).json({success:true,message:"Success created",data:savedTour})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Failed to create. Try again"})
    }
}

//Get tour 
export const getSingleTour = async(req,res)=>{
    try {
        let tour = await Tour.findById(req.params.id).populate("reviews")
        res.status(200).json({success:true,message:"Success get",data:tour})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Not Found"})
    }
}

//Get all tour 
export const getAllTour = async(req,res)=>{

    const page = req.query.page
    console.log("page number ", page);
    try {
        let tours = await Tour.find({}).populate("reviews").skip(page*8).limit(8)
        res.status(200).json(
            {success:true,message:"Success get",
            count:tours.length,data:tours})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Not Found"})
    }
}

//Update tour 
export const updateTour = async(req,res)=>{
    const id = req.params.id

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(201).json({success:true,message:"Success updated",data:updatedTour})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"failed to updated"})
    }
}

//Delete tour 
export const deleteTour = async(req,res)=>{
    try {
        let id = req.params.id
        await Tour.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Success delete"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"failed to delete"})
    }
}

export const getTourBySearch = async(req,res)=>{
    // here i mean case sensitive
    const city = new RegExp(req.query.city,"i")
    const distance = parseInt(req.query.distance,"i")
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    try {
        // gte mean greater than equeal
        const tours = await Tour.find({
            city,
            distance:{$gte:distance},
            maxGroupSize:{$gte:maxGroupSize}
        }).populate("reviews")
        res.status(201).json({success:true,count:tours.length,message:"Success Get",data:tours})
    } catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message:"failed to get"})
    }
    Tour.update
}

//Get featured tours 
export const getFeaturedTour = async(req,res)=>{
    try {
        let tours = await Tour.find({featured:true}).populate("reviews")
        res.status(200).json(
            {success:true,message:"Success get",
            count:tours.length,data:tours})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Not Found"})
    }
}

//Get tours count
export const getTourCount = async(req,res)=>{
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({success:true,data:tourCount})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Failed to fetch document count"})
    }
}


