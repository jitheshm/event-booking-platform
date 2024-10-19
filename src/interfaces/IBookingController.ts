import { NextFunction, Response } from "express";
import { CustomRequest } from "./CustomRequest";

export interface IBookingController {
    bookService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
}