import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import {
  create,
  deleteBlog,
  getBlogDetail,
  getMyBlogs,
  updateBlog,
} from "../controllers/blog.js";
import { upload } from "../helpers/imageupload.js";
import { v2 } from "cloudinary";

import multer from "multer";
import { auth } from "../middlewarae/auth.js";
const router = express.Router();

router.post("/create", auth, upload.single("img"), updateBlog);
router.post("/update");
router.delete("/delete/:id", auth, deleteBlog);

router.get("/myblogs", auth, getMyBlogs);
router.get("/detail/:id", auth, getBlogDetail);

export default router;
