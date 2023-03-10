const express=require("express")
const dotenv=require("dotenv")
const dbConnection=require("./dbConnection")
const cors=require("cors")
const app=express()
const PORT=8085
dotenv.config()
app.use(express.json())
app.use(cors())
// const { notFound, errorHandler } = require("./middleWare/errorMiddleWare");
const userRoute=require("./routes/userRoutes")

app.get("/",(req,res)=>{
    res.send("from home")
})
app.use("/",userRoute)
// ======================MONGODB CONNCETIONS+++++++++=========================
dbConnection();
// app.use(notFound)
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log("server runnig on http://localhost:8085");
});
