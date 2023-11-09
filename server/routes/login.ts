import { Router } from "express";
const router = Router();
import passport from "../config/passport";
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});
module.exports = router;
