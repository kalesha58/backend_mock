const express=require("express")
const dotenv=require("dotenv")
const dbConnection=require("./dbConnection")
const app=express()
const PORT=8085
dotenv.config()
app.use(express.json())
const userRoute=require("./routes/userRoutes")

app.get("/",(req,res)=>{
    res.send("from home")
})
app.use("/",userRoute)
// ======================MONGODB CONNCETIONS+++++++++=========================
dbConnection();

app.listen(PORT, () => {
  console.log("server runnig on http://localhost:8085");
});
