"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const passport_1 = __importDefault(require("../config/passport"));
const bcrypt = require("bcrypt");
const prismadb_1 = __importDefault(require("../libs/prismadb"));
const jwt = require("jsonwebtoken");
router.post("/login", passport_1.default.authenticate("local", {
    failureRedirect: "/failed",
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = jwt.sign({ userid: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email }, process.env.SECRET, { expiresIn: "15d" });
        res.json({ token, user: req.user });
    }
    catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ message: "Token generation failed" });
    }
}));
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("no token");
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "u failed to auth" });
            }
            else {
                req.user = decoded.user;
            }
        });
        next();
    }
};
router.get("/isUserAuth", verifyJWT, (req, res) => {
    res.json({ authStatus: " user logged in " });
});
router.get("/login", (req, res) => {
    res.send("hello login route");
});
/*
 *
 *
 *Logout
 *
 *
 */
router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err)
            return next(err);
    });
    res.redirect("/");
});
/*
 *
 *
 *Register
 *
 */
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email } = req.body;
        const encryptedPassword = yield bcrypt.hash(password, 12);
        const user = yield prismadb_1.default.user.create({
            data: {
                email,
                encryptedPassword,
                full_name: name,
            },
        });
        console.log({ message: "Registration Successful!", user });
        res.status(201).json({ message: "Registration Successful!", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Registration Failed!");
    }
}));
module.exports = router;
