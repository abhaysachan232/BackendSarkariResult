const express = require ('express');
const connectDataBase = require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDataBase();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API running");
});
const routes = require("./Routes/routes");
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});