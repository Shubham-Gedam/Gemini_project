import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import * as aiService from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import { text } from "express";

export function initSocketServer(httpserver) {
  const io = new Server(httpserver, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("authentication error: token not provide"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("authentication error: token invalid"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      console.log(messagePayload);

      await messageModel.create({
        chat: messagePayload.chat,
        content: messagePayload.message,
        user: socket.user._id,
        role: "user",
      });
      
      const chatHistory = await messageModel.find({chat: messagePayload.chat});
      

      const response = await aiService.generateResponse(chatHistory.map(item =>{
        return{
            role: item.role,
            parts: [{text: item.content}]
        }
      }));

      await messageModel.create({
        chat: messagePayload.chat,
        content: response,
        user: socket.user._id,
        role: "model",
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });
  });
}
