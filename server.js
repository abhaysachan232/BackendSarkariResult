const express = require ('express');
const connectDataBase = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");


const app = express();
connectDataBase();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://sarkariresult.rest",
      "https://www.sarkariresult.rest",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user,
  });
});

app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT}`)});