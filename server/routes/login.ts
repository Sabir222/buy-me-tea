import { Router } from "express";
const router = Router();
import passport from "../config/passport";
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.json({
      status: "success",
      message: "Authentication successful",
    });
  }
);

router.get("/", (req, res) => {
  res.send("hello login route");
});
module.exports = router;
