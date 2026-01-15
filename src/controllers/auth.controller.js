import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function register(req, res) {
  const {
    email,
    fullname: { firstName, lastName },
    password,
  } = req.body;

  const isUserAlreadyExists = await userModel.findOne({email})

  if(isUserAlreadyExists){
    res.status(400).json({
        message:"user already exits"
    })
  }
  const hashPassword = bcrypt.hash(password,10)
  const user = await userModel.create({
    fullname:{
        firstName, lastName
    },
    email,
    password: hashPassword
  })
}
