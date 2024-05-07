import express from "express";
import authMiddleWare from "../middleware/authentication";
import upload from "../middleware/multer";

const router = express.Router();

import {
  login,
  register,
  sendDetails,
  profile,
  passwordChange,
  updateProfile,
  uploadProfilePicture,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.put("/password", authMiddleWare, passwordChange);
router.get("/", authMiddleWare, sendDetails);
router.get("/profile", authMiddleWare, profile);
router.put("/profile", authMiddleWare, updateProfile);
router.put(
  "/profile/picture",
  authMiddleWare,
  upload.single("profileImage"),
  uploadProfilePicture,
);

export default router;
