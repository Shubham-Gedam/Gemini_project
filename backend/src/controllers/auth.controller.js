import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const {
    email,
    fullname: { firstName, lastName },
    password,
  } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "user already exits",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password: hashPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user register succesfully",
    user: {
      email: user.email,
      _id: user._id,
      fullname: user.fullname,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      email: user.email,
      _id: user._id,
      fullname: user.fullname,
    },
  });
}
