import { Request, Response, NextFunction } from "express";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Dude login first" });
    res.redirect("/login");
  }
};

export default isAuth;
