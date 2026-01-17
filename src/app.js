import express from 'express'
import cookieParser from 'cookie-parser'

//routes
import authRoutes from './routes/auth.route.js'
import chatRoute from './routes/chat.route.js'

const app =  express()


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoute)

export default app