

import express from "express"

const PORT = process.env.PORT || 3000
const app = express()


app.get("/alfian",(req,res)=>{
    res.json({name:"Alfian Alamsyah"})
})


app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`);
})


