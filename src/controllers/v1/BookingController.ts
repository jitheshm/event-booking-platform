import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/CustomRequest";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { IBookingService } from "../../interfaces/IBookingService";

@injectable()
export class BookingController {

    private bookingService: IBookingService

    constructor(
        @inject("IBookingService") bookingService: IBookingService
    ) {
        this.bookingService = bookingService
    }

    async bookService(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const serviceId = req.params.serviceId
            const decodeData = req.decodeData as JwtPayload
            const data = req.body.booking_dates
            const result = await this.bookingService.ServiceBook(decodeData.id, serviceId, data)
            res.status(201).json({ success: true, data: result, message: "booking successfull" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}