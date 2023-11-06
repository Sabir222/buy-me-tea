import express, { Express, Request, Response } from "express";
const app = express();
const PORT = 8080;
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/auth");


app.use(cors());

app.get("/", (Request, Response) => {
  Response.json({ message: "Hello World!" });
});
app.use("/login", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
