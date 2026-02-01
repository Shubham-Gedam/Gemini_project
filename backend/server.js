import { configDotenv } from 'dotenv';
configDotenv()
import app from './src/app.js'
import { ConnectDb } from './src/db/db.js';
import { initSocketServer } from './src/socket/socket.server.js'
import http from 'http';
const httpServer = http.createServer(app);
 
ConnectDb()
initSocketServer(httpServer)

httpServer.listen(3000,()=>{
    console.log("server is running on 3000");
});