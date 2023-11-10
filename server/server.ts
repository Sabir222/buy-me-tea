import express from "express";
const app = express();
const cors = require("cors");
const authRoute = require("./routes/register");
const paymentRoute = require("./routes/payment");
const loginRoute = require("./routes/login");
const protectedRoute = require("./routes/protected");
const session = require("express-session");
require("dotenv").config();
const PORT = 8080;
import passport from "./config/passport";

/*
 *
 *
 *
 */
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 *
 *
 */

app.get("/", (req: any, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
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
