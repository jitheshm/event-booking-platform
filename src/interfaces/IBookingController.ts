import { NextFunction, Response } from "express";
import { CustomRequest } from "./CustomRequest";

export interface IBookingController {
    bookService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    userBookingList(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    bookingDetails(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    serviceBookingList(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
}