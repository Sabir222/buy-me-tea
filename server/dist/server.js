"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const authRoute = require("./routes/register");
const paymentRoute = require("./routes/payment");
const loginRoute = require("./routes/login");
const protectedRoute = require("./routes/protected");
const session = require("express-session");
require("dotenv").config();
const PORT = 8080;
const passport_1 = __importDefault(require("./config/passport"));
/*
 *
 *
 *
 */
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/*
 *
 *
 */
app.get("/", (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount++;
    }
    else {
        req.session.viewCount = 1;
    }
    res.json(req.session.viewCount);
});
app.use("/register", authRoute);
app.use("/payment", paymentRoute);
app.use("/login", loginRoute);
app.use("/protected", protectedRoute);
/*
 *
 *
 *
 *
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
