import mongoose from "mongoose";
import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Enter valid email address" });
  }
  const alreadyExists = await User.find({ email });
  console.log(alreadyExists);
  if (alreadyExists.length > 0) {
    return res.status(400).json({ error: "email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, password: hashedPassword, email });
  res.status(201).json("user created successfully");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Enter valid email address" });
  }
  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ error: "No account exists with this email address" });
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return res.status(400).json({ error: "enter correct password" });
  }
  const token = jwt.sign(
    { id: user._id, email, password },
    process.env.JWT_KEY
  );

  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};
