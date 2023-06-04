import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const dataSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

dataSchema.plugin(mongoosePaginate);

const Blog = new mongoose.model("Blog", dataSchema);

export default Blog;
