import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import tourRoute from "./routers/tours.js"
import userRoute from "./routers/users.js"
import authRouter from "./routers/auth.js"
import reviewRouter from "./routers/review.js"
import bookingRouter from "./routers/booking.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

const corsOption = {
    origin:true,
    credentials:true
}


// database connection
mongoose.set("strictQuery",false)
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:false,
            useUnifiedTopology:true
        })

        console.log("Mongo db database connected");
    } catch (error) {
        console.log(`Mongo db database connection failed ${error.message}`);
    }
}

// midleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

// router
app.use("/api/v1/tours",tourRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/booking",bookingRouter)





app.get("/",(req,res)=>{
    res.json({status:true,progress:"Running"})
})


connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port ${PORT}`);
    })
})


