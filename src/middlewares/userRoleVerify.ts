import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import CustomError from "../errors/CustomError";


export default (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        if (req.decodeData!.role === 'user') {
            next()
        } else {
            throw new CustomError("unauthorized", 401)
        }
    } catch (error) {
        next(error)
    }
};
