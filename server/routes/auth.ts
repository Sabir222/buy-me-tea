import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello Route!</h1>");
});
console.log(process.env.MONGO_USERNAME);
module.exports = router;
