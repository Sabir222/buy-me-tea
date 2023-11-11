"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = require("jsonwebtoken");
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
// const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     res.status(401).json({ authentication: false });
//   } else {
//     jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
//       if (err) {
//         res
//           .status(500)
//           .json({ auth: false, message: "Failed to authenticate token." });
//       } else {
//         req.user = decoded.user;
//         next();
//       }
//     });
//   }
// };
// router.get("/checkAuth", verifyJWT, (req: Request, res: Response) => {
//   res.status(200).json({ auth: true, usr: req.user });
// });s
