"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ msg: "Dude login first" });
        res.redirect("/login");
    }
};
exports.default = isAuth;
