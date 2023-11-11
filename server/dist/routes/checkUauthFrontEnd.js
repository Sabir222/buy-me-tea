"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get("/checkAuth", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(req.user);
    }
    else {
        console.log("uuuuuuuuuuuuuuuuuuuuuuu");
        res.status(401).json({ authentication: false });
    }
});
module.exports = router;
