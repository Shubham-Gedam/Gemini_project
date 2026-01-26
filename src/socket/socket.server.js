import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import * as aiService from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import * as vectorService from "../services/vector.service.js";



export function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  /* Socket.io Middleware  */
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    const token = cookies.token; // yahan se token milega
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //  token verify

      const user = await userModel.findById(decoded.id);

      socket.user = user; // user info socket me attach

      next();
    } catch (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    //Listner
    socket.on("ai-message", async (messagePayload) => {
      // console.log(messagePayload);

      // save user message
      const message =  await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user",
      });

      const vectors = await aiService.generateVector(messagePayload.content);

      const memory = await vectorService.queryMemory({
        queryvector: vectors,
        limit: 5,
        metadata: {

        }
      })

      await vectorService.createMemory({
        vectors,
        messageId: message._id,
        metadata:{
          chatId: messagePayload.chat,
          userId: socket.user._id,
          text: messagePayload.content
        }
      })
      
      console.log(memory);

      // get ordered history
      const chatHistory = await messageModel
        .find({ chat: messagePayload.chat })
        .sort({ createdAt: 1 });

      const response = await aiService.generateResponse(
        chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.content }],
        })),
      );

      // save AI message
      const responseMessage = await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model",
      });

      const responseVectors = await aiService.generateVector(response);

      await vectorService.createMemory({
        vectors: responseVectors,
        messageId: responseMessage._id,
        metadata:{
          chatId: messagePayload.chat,
          userId: socket.user._id,
          text: response
        }
      })

      // send AI reply
      socket.emit("ai-response", {
        chat: messagePayload.chat,
        message: response,
      });
    });
  });
}
