"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const authRoute = require("./routes/register");
const session = require("express-session");
require("dotenv").config();
const PORT = 8080;
app.use(cors());
app.use(express_1.default.json());
app.get("/", (Request, Response) => {
    Response.json({ message: "Hello World!" });
});
app.use("/register", authRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
