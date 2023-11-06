"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users = [
    {
        name: "Sabir",
        password: 123,
        email: "sabir@email.com",
    },
    {
        name: "Imam",
        password: 123,
        email: "imam@email.com",
    },
    {
        name: "Rime",
        password: 123,
        email: "rime@email.com",
    },
];
router.get("/:id", (req, res) => {
    res.json(users);
    console.log(req.query);
});
router.delete("/:id", (req, res) => {
    console.log(req.query);
    res.json(users);
});
module.exports = router;
