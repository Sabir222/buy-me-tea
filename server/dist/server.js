"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
