"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/", (req, res) => {
    try {
        const { name, message, price } = req.body;
        console.log(name, " ", message, " ", price);
        const supportMessage = "nice";
        res.status(201).json({
            message: "support data retrieved successfully!",
            supportMessage,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("support data retrieval failed!");
    }
});
module.exports = router;
