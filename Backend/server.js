import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config.js'
import userRouter from "./routes/userRoute.js"
import newsRouter from "./routes/newsRoute.js"


//app config

const app = express()
const port = 4000


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serve static files from uploads directory
import path from 'path';
import { fileURLToPath } from 'url';
import testRouter from "./routes/testRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//db connection
connectDB()

//api end point
app.use("/api/user",userRouter)
app.use("/api/news",newsRouter)
app.use("/api/tests",testRouter)


app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
}) 

