import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello Route!</h1>");
});

module.exports = router;
