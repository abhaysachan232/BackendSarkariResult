const express = require ('express');
const connectDataBase = require('./config/db');
require('dotenv').config();

const app = express();
connectDataBase();
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT}`)});