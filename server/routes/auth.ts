import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import passport from "../config/passport";
const bcrypt = require("bcrypt");
import prisma from "../libs/prismadb";
/*
 *
 *
 *Login
 *
 *
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failed",
  }),
  (req: Request, res: Response) => {
    res.json(req.user);
  }
);

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
