import { Server } from "socket.io";

export function initSocketServer(httpserver){

    const io = new Server(httpserver,{})

    io.on('connection',(socket) =>{
        console.log("new socket connection:", socket.id);
        
    })
}

