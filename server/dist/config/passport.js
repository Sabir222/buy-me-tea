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
const prismadb_1 = __importDefault(require("../libs/prismadb"));
const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
//import passport from "passport";
const passport_1 = __importDefault(require("passport"));
const bcrypt = require("bcrypt");
/*
 *
 */
const User = prismadb_1.default.user;
const verifyCallback = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Verifying user:", email);
    if (!email || !password)
        return done(null, false);
    try {
        const user = yield prismadb_1.default.user.findUnique({
            where: { email: email },
        });
        if (!user || !user.encryptedPassword) {
            return done(null, false);
        }
        const isCorrectPassword = yield bcrypt.compare(password, user.encryptedPassword);
        if (!isCorrectPassword)
            return done(null, false);
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
});
const Strategy = new LocalStrategy(verifyCallback);
passport_1.default.use(Strategy);
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User.findUnique({ where: { id: id } }).then((user) => {
        done(null, user).catch((err) => done(err));
    });
});
exports.default = passport_1.default;
