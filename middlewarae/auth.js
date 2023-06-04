import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    const token = header?.split(" ")[1];

    if (!token)
      return res.status(401).send("Access Denied: No Token Provided!");
    const isTrue = await jwt.verify(token, process.env.JWT_KEY);
    if (!isTrue) return res.status(401).send("Access Denied!!");
    req.profile = isTrue.id;
    const user = await User.findById(isTrue.id);
    req.profile = user;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
