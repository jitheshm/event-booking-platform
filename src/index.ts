import "reflect-metadata";
import express from 'express'

import dotenv from 'dotenv'
dotenv.config();

import router from './routes/router'
import errorHandler from './middlewares/errorHandler'
import dbConnect from "./config/db/dbConnect";

const app = express()



const port = process.env.PORT || 3001
app.use(express.json())
dbConnect()

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})

