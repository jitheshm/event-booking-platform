import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";

export default (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ success: false, description: err.message });
    } else {
        res.status(500).json({ success: false, description: "internal server error" });
    }
};
