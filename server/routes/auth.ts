import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import passport from "../config/passport";
const bcrypt = require("bcrypt");
import prisma from "../libs/prismadb";
import { verify } from "crypto";
const jwt = require("jsonwebtoken");
/*
 *
 *
 * Login
 *
 *
 */

interface ReqUser extends Request {
  user?: {
    id?: number;
    email?: string;
  };
}
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failed",
  }),
  async (req: ReqUser, res: Response) => {
    try {
      const token = jwt.sign(
        { userid: req.user?.id, email: req.user?.email },
        process.env.SECRET,
        { expiresIn: "15d" }
      );
      res.json({ token, user: req.user });
    } catch (error) {
      console.error("Token generation error:", error);
      res.status(500).json({ message: "Token generation failed" });
    }
  }
);

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("no token");
  } else {
    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err) {
        res.json({ auth: false, message: "u failed to auth" });
      } else {
        req.user = decoded.user;
      }
    });
    next();
  }
};

router.get("/isUserAuth", verifyJWT, (req: Request, res: Response) => {
  res.json({ authStatus: " user logged in " });
});

router.get("/login", (req: Request, res: Response) => {
  res.send("hello login route");
});

/*
 *
 *
 *Logout
 *
 *
 */
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) return next(err);
  });
  res.redirect("/");
});

/*
 *
 *
 *Register
 *
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        encryptedPassword,
        full_name: name,
      },
    });
    console.log({ message: "Registration Successful!", user });
    res.status(201).json({ message: "Registration Successful!", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Registration Failed!");
  }
});
module.exports = router;
