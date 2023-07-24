import User from "../models/User.js"



//Get User 
export const getSingleUser = async(req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        res.status(200).json({success:true,message:"Success get",data:user})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Not Found"})
    }
}

//Get all User 
export const getAllUser = async(req,res)=>{
    try {
        let users = await User.find({})
        res.status(200).json(
            {success:true,message:"Success get",data:users})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Not Found"})
    }
}

//Update User 
export const updateUser = async(req,res)=>{
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(201).json({success:true,message:"Success updated",data:updatedUser})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"failed to updated"})
    }
}

//Delete User 
export const deleteUser = async(req,res)=>{
    try {
        let id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Success delete"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:error.message})
    }
}