import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/", async (req, res) => {
  const { name, password, email } = req.body;
  console.log(name, password, email);
  res.status(200).send("User created");
});
module.exports = router;
