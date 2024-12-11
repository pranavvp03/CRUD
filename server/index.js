const express = require("express");
const dotenv =  require("dotenv")
const mongoose = require("mongoose");
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected successfully😎"))
.catch((err)=>console.log("Database connection failed", err))
app.use(express.json());
app.use("/", require("./routes/authRoutes"));
const PORT = 3001;
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))



