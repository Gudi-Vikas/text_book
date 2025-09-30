import multer from "multer";
import path from "path";
import fs from "fs";

// factory function to create multer instance with custom folder
const makeUploader = (folderName) => {
  const uploadPath = `uploads/${folderName}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) {
      return cb(new Error("Only .png, .jpg, .jpeg are allowed"));
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter });
};

export default makeUploader;
