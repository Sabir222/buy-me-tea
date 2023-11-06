import express from "express";
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const session = require("express-session");
require("dotenv").config();

const PORT = 8080;
app.use(cors());

app.get("/", (Request, Response) => {
  Response.json({ message: "Hello World!" });
});
app.use("/login", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
