import { NextFunction, Response } from "express";
import { decryptToken } from "../utils/token";
import { CustomRequest } from "../interfaces/CustomRequest";
import CustomError from "../errors/CustomError";

export default (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.eventToken
        if(!token){
            throw new CustomError("unauthorized", 401)
        }
        const decodeData = decryptToken(token)
        req.decodeData = decodeData
        if (decodeData) {
            next()
        } else {
            throw new CustomError("unauthorized", 401)
        }
    } catch (error) {
        next(error)
    }
};
