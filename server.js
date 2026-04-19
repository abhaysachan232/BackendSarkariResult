import express, { json } from "express";
const connectDataBase = require("./config/db");
import routes from "./router/routes.js";
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDataBase();

app.use(json());
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
