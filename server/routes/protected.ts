import { Router, Response, Request } from "express";
const router = Router();
import isAuth from "../routes/authMiddleware";


router.get("/", isAuth, (req: Request, res: Response) => {
  res.send("This route is protected");
});

module.exports = router;
