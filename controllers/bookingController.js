
import Booking from "../models/Booking.js"


// harusnya nanti di cek kalo no teleponnya beneran nomer atau enggak
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save() 
        res.status(200).json({success:true,message:"Booking is created",data:savedBooking})
        
    } catch (error) {
        const phoneError = error.errors.phone.properties
        console.log(error.errors);
        console.log(error.message);
        if(phoneError.path=="phone"){
            return res.status(500).json({
                success:false,
                message:`${phoneError.path} section is ${phoneError.type} and shold be a number`})
        }
        
        return res.status(500).json({success:false,message:"Internal server error"})
    }   
}
export const getBooking = async(req,res)=>{
    try {
        const id = req.params.id
        const booking = await Booking.findById(id)
        return res.status(200).json({success:true,message:"Booking Data",data:booking})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export const getAllBooking = async(req,res)=>{
    try {
        const allBooking = await Booking.find()
        res.status(200).json({success:true,message:"All Booking Data",
        count:allBooking.length,data:allBooking})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}