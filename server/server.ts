import express, { Response, Request, NextFunction } from "express";
const app = express();
const cors = require("cors");
const paymentRoute = require("./routes/payment");
const authRoute = require("./routes/auth");
const frontAuth = require("./routes/authCheck");
const protectedRoute = require("./routes/protected");
const session = require("express-session");
const helmet = require("helmet");
require("dotenv").config();
const PORT = 8080;
import passport from "./config/passport";
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: any, res: Response, next: NextFunction) => {
  console.log(req.session);
  console.log(req.user);
  next();
});
/*
 *
 *
 */

app.get("/", (req: Request, res: Response, next) => {
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
