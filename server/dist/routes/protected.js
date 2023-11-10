"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authMiddleware_1 = __importDefault(require("../routes/authMiddleware"));
router.get("/", authMiddleware_1.default, (req, res) => {
    res.send("This route is protected");
});
module.exports = router;
