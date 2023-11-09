"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const passport_1 = __importDefault(require("../config/passport"));
router.post("/login", passport_1.default.authenticate("local"), (req, res) => {
    res.json(req.user);
});
module.exports = router;
