import mongoose from 'mongoose'
import {DB_NAME} from "./constants.js"
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();   // wait for DB first

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();




// this () function is called iife(Immediately Invoked Function Expression), the main usecase of this method is that it dosen't need function call to execute
// remember this rule of thumb while dealing with mongoDB database always use async/await as the server is generally located in another continent 
// use try/catch always it is a good approach


/* approach - 1 
const app = express()
// instead of using iffy you can use a function and export it as usual and use it in another file by importing this file
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error :",error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`process is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR :", error)
        throw err
    }
})*/
