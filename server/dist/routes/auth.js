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
/*
 *
 *
 *Login
 *
 *
 */
router.post("/login", passport_1.default.authenticate("local", {
    failureRedirect: "/failed",
}), (req, res) => {
    res.json({
        status: "success",
        message: "Authentication successful",
    });
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
