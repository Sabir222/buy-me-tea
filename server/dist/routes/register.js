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
const bcrypt = require("bcrypt");
const prismadb_1 = __importDefault(require("../libs/prismadb"));
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(201).json({ message: "Registration Successful!", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Registration Failed!");
    }
}));
module.exports = router;
