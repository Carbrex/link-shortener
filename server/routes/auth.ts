import express from "express";
import authMiddleWare from "../middleware/authentication";
const router = express.Router();

import { login, register, sendDetails } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleWare, sendDetails);

export default router;
