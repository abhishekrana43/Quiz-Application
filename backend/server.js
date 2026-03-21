import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 4000;

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes

app.use('/api/auth', userRouter);

app.get("/", (req,res)=>{
    res.send("API working ");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
    connectDB();
})