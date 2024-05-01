import express from 'express'
import { dbConnection } from './database/dbConnection.js';
import dotenv from 'dotenv'
import messageRouter from './router/messageRouter.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';


const app = express()

const __dirname = fileURLToPath(import.meta.url);

dotenv.config({path: './config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ['POST'],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/message', messageRouter)

dbConnection()

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
})

export default app
