import "reflect-metadata";
import express from 'express'
import router from './routes/router'
import errorHandler from './middlewares/errorHandler'
import dbConnect from "./config/db/dbConnect";
import dotenv from 'dotenv'

const app = express()

dotenv.config();


const port = process.env.PORT || 3001
app.use(express.json())
dbConnect()

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})

