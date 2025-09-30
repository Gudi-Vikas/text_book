import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config.js'
import userRouter from "./routes/userRoute.js"
import newsRouter from "./routes/newsRoute.js"


//app config

const app = express()
const port = 4000


// middleware

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Serve static files from uploads directory
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//db connection
connectDB()

//api end point
app.use("/api/user",userRouter)
app.use("/api/news",newsRouter)

app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
}) 

