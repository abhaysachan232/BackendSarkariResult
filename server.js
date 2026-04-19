const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const auth = require('./controller/authController');

const app = express();


app.use(express.json());

connectDB();

// app.use("/api", authRoutes);
app.get('/',(req,res)=>{
  console.log("Hello World",req);
  res.send("Hello World");
})
app.get("/api/health", (req, res) => {
  res.send("OK HEALTH");
});
app.post("/api/login", auth.signIn);
app.post("/api/signup", auth.signUp);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});