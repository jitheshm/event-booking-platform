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

    async userBookingList(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const decodeData = req.decodeData as JwtPayload
            const result = await this.bookingService.userBookingList(decodeData.id)
            res.status(200).json({ success: true, data: result, message: "booking list fetched successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async bookingDetails(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const bookingId=req.params.bookingId
            const result=await this.bookingService.bookingDetails(bookingId)
            res.status(200).json({success:true,data:result,message:"booking details fetched successfully"})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}