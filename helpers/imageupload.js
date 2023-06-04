import multer from "multer";
import path from "path";
import { v2 } from "cloudinary";
v2.config({
  cloud_name: "dbhkpbxkb",
  api_key: "231751447435722",
  api_secret: "YnbAY5n3BqEWhhB-1WCYsG00V5I",
});

export default v2;
export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
