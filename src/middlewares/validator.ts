import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";
import CustomError from "../errors/CustomError";

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err:any) {
        console.log(err.errors)
        next(new CustomError(err.errors, 400))
    }
};