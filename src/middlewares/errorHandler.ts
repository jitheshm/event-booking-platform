import { Request, Response } from "express"
import CustomError from "../Errors/CustomError"


export default (err: CustomError, req: Request, res: Response) => {
    console.log(err)
    res.status(err.statusCode).json({ success: false, description: err.message })
}