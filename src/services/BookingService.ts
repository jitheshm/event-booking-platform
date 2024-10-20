import { inject, injectable } from "inversify";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { Types } from "mongoose";
import CustomError from "../errors/CustomError";
import { IBookingRepository } from "../interfaces/IBookingRepository";
import { IBookingService } from "../interfaces/IBookingService";
import IUserRepository from "../interfaces/IUserRepository";
import { sendConfirmEmail } from "../utils/email";

@injectable()

export class BookingService implements IBookingService {
    private serviceRepository: IServiceRepository
    private bookingRepository: IBookingRepository
    private userRepository: IUserRepository
    constructor(
        @inject("IServiceRepository") serviceRepository: IServiceRepository,
        @inject("IBookingRepository") bookingRepository: IBookingRepository,
        @inject("IUserRepository") userRepository: IUserRepository
    ) {
        this.serviceRepository = serviceRepository
        this.bookingRepository = bookingRepository
        this.userRepository = userRepository
    }

    async ServiceBook(userId: string, serviceId: string, dates: string[]) {
        const data = {
            user_id: new Types.ObjectId(userId),
            service_id: new Types.ObjectId(serviceId),
            booking_dates: dates.map((ele) => new Date(ele)),
            total_price: 0
        }
        const service = await this.serviceRepository.findServiceById(data.service_id)
        if (!service[0]) {
            throw new CustomError("service not found", 404)

        }

        const unavailableDates = data.booking_dates.filter(bookingDate => {
            const dateFound = service[0].availability_dates.find(
                availDate =>
                    availDate.date.getTime() === bookingDate.getTime() &&
                    availDate.status === "open"
            );
            return !dateFound;
        });

        if (unavailableDates.length > 0) {
            throw new CustomError("Some of the selected dates are not available for booking.", 409);
        }

        await this.serviceRepository.availableStatusUpdate(data.service_id, data.booking_dates, "booked")
        try {
            data.total_price = service[0].price_per_day * dates.length
            const bookedResult = await this.bookingRepository.confirm(data)
            const user = await this.userRepository.findById(data.user_id)
            sendConfirmEmail(user, service[0], data.booking_dates)
            return bookedResult
        } catch (error) {
            await this.serviceRepository.availableStatusUpdate(data.service_id, data.booking_dates, "open")
            throw error

        }

    }

    async userBookingList(userId: string) {
        const currentDate = new Date()
        return await this.bookingRepository.userBookingList(new Types.ObjectId(userId), currentDate)
    }

    async bookingDetails(bookingId: string) {
        const result = await this.bookingRepository.fetchBookingDetailsById(new Types.ObjectId(bookingId))
        if (result.length < 1) {
            throw new CustomError("booking not found", 404)
        }
        return result
    }

    async serviceBookingList(serviceId: string) {
        const currentDate = new Date()
        return await this.bookingRepository.serviceBookingList(new Types.ObjectId(serviceId), currentDate)
    }
}