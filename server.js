import express from "express";
import connectdb from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app=express();
app.use(express.json());app.use(cors());
import course from "./routes/courseroute.js";
import liveclass from "./routes/liveclassroute.js";
import user from './routes/userroute.js'
app.use("/user",user)
app.use("/course", course);
app.use('/liveclass',liveclass)
connectdb();
app.listen(5000,()=>{
    console.log(`server is running at http://localhost:5000`);

})