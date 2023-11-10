"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const paymentRoute = require("./routes/payment");
const authRoute = require("./routes/auth");
const frontAuth = require("./routes/checkUauthFrontEnd");
const protectedRoute = require("./routes/protected");
const session = require("express-session");
const helmet = require("helmet");
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
app.use(helmet());
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});
/*
 *
 *
 */
app.get("/", (req, res, next) => {
    res.send("Hello Home Page");
});
app.use("/payment", paymentRoute);
app.use("/", authRoute);
app.use("/protected", protectedRoute);
app.use("/", frontAuth);
/*
 *
 *
 *
 *
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
