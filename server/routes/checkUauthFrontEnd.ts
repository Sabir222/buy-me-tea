import Router, { Request, Response } from "express";

const router = Router();

router.get("/checkAuth", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    console.log("uuuuuuuuuuuuuuuuuuuuuuu");
    res.status(401).json({ authentication: false });
  }
});

module.exports = router;
