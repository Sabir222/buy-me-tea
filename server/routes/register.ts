import { Router } from "express";
const router = Router();
const bcrypt = require("bcrypt");

import prisma from "../libs/prismadb";

router.post("/", async (req, res) => {
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