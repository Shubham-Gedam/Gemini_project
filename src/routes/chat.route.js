import express from'express'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as chatCotroller from '../controllers/chat.controller.js'


const router = express.Router()

router.post('/',authMiddleware.authUser, chatCotroller.createChat)



export default router