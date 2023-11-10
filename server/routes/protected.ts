import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("damn son you are logged in");
  } else {
    res.send("damn son you are not logged in");
  }
});

module.exports = router;
