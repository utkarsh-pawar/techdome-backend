import v2 from "../helpers/imageupload.js";
import Blog from "../models/blog.model.js";
import mongoose from "mongoose";
export const create = async (req, res) => {
  console.log(req.file.path);
  const result = await v2.uploader.upload(req.file.path);
  console.log(result);

  console.log(req.profile);
  const { title, content } = req.body;
  await Blog.create({
    title,
    content,
    userID: req.profile._id,
    img: result.url,
  });
  res.status(200).json("blog created successfully");
};

export const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const result = await v2.uploader.upload(req.file.path);
  Blog.findByIdAndUpdate(
    { _id: req?.body?.blogid },
    { title, content, img: result.url },
    { new: true, upsert: true }
  );
  res.status(200).json("Updated successfully");
};

export const deleteBlog = async (req, res) => {
  const { blogid } = req.body;
  Blog.findByIdAndDelete({ _id: blogid });
  res.status(200).json("deleted successfully");
};

export const getMyBlogs = async (req, res) => {
  const { _id } = req.profile;
  const blogs = await Blog.paginate({ userID: _id }, { sort: "createdAt" });
  res.status(200).json(blogs);
};
export const getBlogDetail = async (req, res) => {
  const { id } = req.params;
  const detail = await Blog.findById(id);
  res.status(200).json(detail);
};
