import express from "express";
const app = express();
const cors = require("cors");
const authRoute = require("./routes/register");
const session = require("express-session");
require("dotenv").config();

const PORT = 8080;
app.use(cors());
app.use(express.json());
app.get("/", (Request, Response) => {
  Response.json({ message: "Hello World!" });
});

app.use("/register", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
