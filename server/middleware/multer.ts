import multer, { MulterError } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;
