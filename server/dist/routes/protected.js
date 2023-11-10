"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("damn son you are logged in");
    }
    else {
        res.send("damn son you are not logged in");
    }
});
module.exports = router;
