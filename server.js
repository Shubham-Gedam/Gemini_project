import { configDotenv } from 'dotenv';
configDotenv()
import app from './src/app.js'
import { ConnectDb } from './src/db/db.js';
 
ConnectDb()

app.listen(3000,()=>{
    console.log("server is running on 3000");
    
})